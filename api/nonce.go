package handler

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"runtime"
	"strconv"
	"sync"
)

func mineWorker(workerID int, nonce int, solutionCh chan<- int, doneCh chan struct{}) {
	solution := workerID + 1
	fmt.Printf("Worker %d: Mining...\n", workerID)

	for {
		select {
		case <-doneCh:
			return // Stop the worker if doneCh is closed
		default:

			attempValue := solution + nonce
			data := []byte(fmt.Sprintf("%d", attempValue))
			hash := md5.New()
			hash.Write(data)
			attempt := hex.EncodeToString(hash.Sum(nil))

			if attempt[:6] == "000000" {
				fmt.Printf("Worker %d: Solved %d\n", workerID, solution)
				solutionCh <- solution
				close(doneCh) // Close doneCh to signal other workers to stop
				return
			}
			solution += runtime.NumCPU() // Increment by the number of CPU threads
		}
	}
}

func mine(nonce int) int {
	numCPU := runtime.NumCPU()
	solutionCh := make(chan int, numCPU)
	doneCh := make(chan struct{})

	var wg sync.WaitGroup
	wg.Add(numCPU)

	for i := 0; i < numCPU; i++ {
		go func(workerID int) {
			defer wg.Done()
			mineWorker(workerID, nonce, solutionCh, doneCh)
		}(i)
	}

	wg.Wait()
	close(solutionCh)
	solution := <-solutionCh
	fmt.Printf("Final Solution: %d\n", solution)
	return solution
}

func Handler(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	nonce := q.Get("value")
	i, err := strconv.Atoi(nonce)
	if err != nil {
		panic(err)
	}
	solution := mine(i)
	fmt.Println(solution)
	resp := make(map[string]string)
	resp["solution"] = strconv.Itoa(solution)
	w.Header().Set("Content-Type", "application/json")
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
}
