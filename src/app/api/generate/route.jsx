    const food = [
        { name: "Куриная грудка с рисом", calories: 450 },
        { name: "Омлет с овощами", calories: 280 },
        { name: "Тушёная говядина с гречкой", calories: 520 },
        { name: "Запечённый лосось с овощами", calories: 410 },
        { name: "Паста с томатным соусом", calories: 365 },
        { name: "Сэндвич с тунцом", calories: 330 }
    ];

    const salads = [
        { name: "Греческий салат", calories: 210 },
        { name: "Салат из огурцов и помидоров с маслом", calories: 90 },
        { name: "Овощной салат с листовым салатом и сыром", calories: 150 },
        { name: "Салат с куриной грудкой и овощами", calories: 320 },
        { name: "Салат с тунцом и стручковой фасолью", calories: 230 },
        { name: "Салат с креветками и авокадо", calories: 280 },
    //     { name: "Салат из свёклы с чесноком и йогуртом", calories: 160 },
    //     { name: "Салат из капусты с морковью и маслом", calories: 120 }
    ];

    const desserts = [
        { name: "Творог с ягодами и мёдом", calories: 220 },
        { name: "Греческий йогурт с фруктами", calories: 180 },
        { name: "Запечённое яблоко с корицей", calories: 150 },
        { name: "Банан с арахисовой пастой", calories: 200 },
        { name: "Овсяное печенье ПП (1 штука)", calories: 90 },
        { name: "Чиа-пудинг на молоке", calories: 240 },
        // { name: "Тёмный шоколад (20 г)", calories: 110 }
    ];



    

    function generateRandom(){
      return Math.floor(Math.random() * 5);
    }
    
    export async function POST(req){
        const body = await req.json(); //Get info from client
        const {weight, height, age, name, gender, chatId} = body;
        let URL = `https://api.telegram.org/bot${process.env.TME_TOKEN}/sendMessage`;

        let bmr = 
            gender === 'male'
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;

        let calories = (bmr * 1.45).toFixed(1);

        const protein = (weight * 1.8).toFixed(1);
        const fats = (weight * 0.9).toFixed(1);
        const carbs = (( calories - protein * 4 - fats * 9) / 3).toFixed(1);

        const lunch = {
            food: '',
            salad: '',
            dessert: '',
            calories: 0
        };

        const dinner = {
            food: '',
            salad: '',
            dessert: '',
            calories: 0
        };

        const maxCalories = calories / 2;
        const minCalories = maxCalories - 400;

        const calcLunch = () => {
            let random = generateRandom();
            
            lunch.food = food[random].name;
            lunch.calories += parseFloat(food[random].calories);

            lunch.salad = salads[random].name;
            lunch.calories += parseFloat(salads[random].calories);

            lunch.dessert = desserts[random].name;
            lunch.calories += parseFloat(desserts[random].calories);

            if( lunch.calories <= minCalories || 
                lunch.calories >= maxCalories){
                    lunch.calories = 0;
                    calcLunch();
            } else {
                return;
            };
        }

        const calcDinner = () => {
            let random = generateRandom();

            dinner.food = food[random].name;
            dinner.calories += parseFloat(food[random].calories);

            dinner.salad = salads[random].name;
            dinner.calories += parseFloat(salads[random].calories);

            dinner.dessert = desserts[random].name;
            dinner.calories += parseFloat(desserts[random].calories);

            if( dinner.calories <= minCalories || 
                dinner.calories >= maxCalories){
                    dinner.calories = 0;
                    calcDinner();
            } else {
                return;
            };
        }

        calcLunch();
        calcDinner();
        
        
        const text = `
            🚻Name: ${name}

            ❤️‍🔥Calorie requirement to maintain life: ${bmr}

            We have also calculated the optimal PFC for you:
                🥩Protein: ${protein}
                🍕Fats: ${fats}
                🥗Carbs: ${carbs} \n

            💊Average calorie intake: ${calories} \n

            🍽 Lunch:  
                       ${ lunch.food }
                       ${ lunch.salad }
                       ${ lunch.dessert }
                       Calories: ${ lunch.calories } \n

            🍽 Dinner: 
                       ${ dinner.food }
                       ${ dinner.salad }
                       ${ dinner.dessert }
                       Calories: ${ dinner.calories } \n

            ⚖Total calories: ${ lunch.calories + dinner.calories }
        `;

        console.log( process.env.TME_TOKEN );

        let res = await fetch( URL, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        } );

        console.log( res );

        return Response.json({ success: true });
    }
