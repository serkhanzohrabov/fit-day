import './Modal.css';
import { Check } from 'lucide-react';
import Link from 'next/link';

const Modal = (props) => {
   
   const {func} = props;
    const myidbotlink = 'https://t.me/myidbot';
    const fitdayidbot = 'https://t.me/fitdayeyecodebot';

    return(
    <div className="modal">
          <Check/>
          <h4>У вас почти все готово!</h4>
          <p>Шаг №1: <Link href={myidbotlink} target='_blank'><span className='active_link'>Получить ID вашего аккаунта</span> </Link> </p>
          <p>Шаг №2: <Link href={fitdayidbot}><span className='active_link'> Открой ссылку и отправь </span> боту команду: /start</Link> </p>
          <button onClick={(e)=>{  
                e.preventDefault();
               func(false);
               
               }}> Понятно </button>  
    </div>)
}

export default Modal;