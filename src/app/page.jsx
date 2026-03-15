import Image from "next/image";
import styles from "./page.module.css";

import Avatar from "@/components/avatar/avatar";
import TextType from "@/components/textType/textType";
import Form from "@/components/form/form";

export default function Home() {
  const name = 'Tim';
   const advices = [
     'Больше овощей и фруктов каждый день.',
     'В каждый приём пищи добавляй белок.' ,
     'Пей достаточно воды, минимум сладких напитков.'
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Avatar />
        <h1>Hello, {name}!</h1>
        <p> <TextType text={advices}/> </p>

        <div className={styles.form}>
          <Form />
        </div>
      </main>
    </div>
  );
}
