    'use client'
    
    import './form.css';
    import { Venus, Mars, Salad,Workflow } from 'lucide-react';
    import { useState } from 'react';
    import Modal from '../modal/Modal';
    import { Activity } from 'react';
    
    const Form = () => {
        const [gender, setGender] = useState(null);
        const [name, setName] = useState(null);
        const [age, setAge] = useState(null);
        const [weight, setWeight] = useState(null);
        const [height, setHeight] = useState(null);
        const [userId, setUserId] = useState(null);
        const [modal, setModal] = useState(false);
        const [isReady,setIsReady] = useState(false);
        

        //PreventDefault turnes off based browser behavior
        function handleVenus(e){ e.preventDefault(); setGender('female'); }
        function handleMars(e){ e.preventDefault(); setGender('male');   }

        function dataValidate(){
            if( gender == null ){
                return false;
            }else if( name == null || name.length <= 2 ){
                return false;
            }else if( age == null || age.length <= 0 ) {
                return false;
            }else if( weight == null || weight.length <= 1 ){
                return false;
            }else if( height == null || height.length <= 1 ){
                return false;
            }else{
                return true;
            }
        }
        
        async function fetchInfo(e){
            e.preventDefault();

            if(dataValidate() == false){
                alert("Please, enter details");
                throw new Error(" Validate error ");
            }
            
            await fetch('/api/generate', {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    age: age,
                    weight: weight,
                    height: height,
                    gender: gender,
                    chatId: userId
                })
            });
            
        }

        return (
            <form action="">
                
               {modal? <Modal func={setModal}/>:''}    

                {/* <Activity   mode={modal?'visible':'hidden'}>
                  <Modal/>
                </Activity>   */}

                <fieldset >
                    <legend>Name</legend>
                    <input onInput={(e)=>{ setName(e.target.value); }} type="text" />
                </fieldset>

                <div className='form-stats'>

                    <fieldset>
                        <legend> Weight </legend>
                        <input onInput={(e)=>{ setWeight(Number(e.target.value)); }} type="text"/>
                    </fieldset>

                    <fieldset>
                        <legend> Height </legend>
                        <input onInput={(e)=>{ setHeight(Number(e.target.value)); }} type="text"/>
                    </fieldset>

                    <fieldset>
                        <legend> Age </legend>
                        <input onInput={(e)=>{ setAge(Number(e.target.value)); }} type="text" />
                    </fieldset>
                
                </div>
                <div className='form-gender'>
                    <button 
                     onClick={handleVenus} 
                     className={gender == 'female'?'active_gender':''}
                    >
                        <Venus color='#ff62f7'/>
                    </button>
                    <button 
                     onClick={handleMars}  
                     className={gender == 'male'?'active_gender':''}
                    > 
                        <Mars  color='#393cff'/> 
                    </button>
                </div>

                <div className='form-user-id'>
                    <fieldset>
                        <legend>User ID</legend>
                        <input type="text" onInput={(e) => { setUserId(Number(e.target.value)); }}/>
                    </fieldset>
                    <button  onClick={(e)=>{ e.preventDefault(); setModal(!modal); setIsReady(true)    }} id='tme-connect'> <Workflow/> Connect </button>
                </div>

                <button  
                 disabled={!isReady} // Если пользователь не прочел инструкцию то кнопка отправки не сработает
                 onClick={fetchInfo}
                 className={`form-generate-btn ${isReady?'':'disabled'}`}>
                    Generate <Salad color='green'/>
                </button>
            </form>
        );
    }

    export default Form;