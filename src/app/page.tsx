import styles from "./page.module.css";
import { UploadForm } from "@/components/UploadForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <UploadForm />
    </div>
  );
}
