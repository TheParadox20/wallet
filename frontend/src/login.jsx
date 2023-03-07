import { useState } from 'react'

let baseURL = ""

export default function Login(){
    let [choiceLogin,setChoice] = useState(true);
    let [username,setUsername] = useState('');
    let [password,setPassword] = useState('');
    
    
    let submit = (e,username,password,choice) => {
        e.preventDefault();
        let parameters = "";
        if(!choice){//signup flow
            parameters+='/onboard?username='+username+'&password='+password;
            console.log('signup : ',baseURL);
        }else{// log in flow
            parameters+='/login?username='+username+'&password='+password;
            console.log('Log in : ',parameters)
        }
        fetch(baseURL + parameters).then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.ACK=='OK'){
                localStorage.setItem('userID',data.ID);
                localStorage.setItem('balance',data.Balance);
            }else if(data.signup=='success'){
                setChoice(true);
            }else if(data.ACK=='FAIL'){
                document.getElementById('wrong').style.visibility = 'visible';
            }
        })
        .catch((error) => console.log(error));
    }

    return(
        <div className="overlay" id='login'>
            <div className="content">
                <div className="menu">
                    <button className={choiceLogin?'choice active':'choice'} onClick={(e)=>setChoice(true)}>Log In</button>
                    <button className={!choiceLogin?'choice active':'choice'} onClick={(e)=>setChoice(false)}>Sign Up</button>
                </div>
                <div className="form" id={choiceLogin?'me':'notme'}>
                    <form>
                        <input type="text" value={username} className="input-search" onChange={event =>{setUsername(event.target.value)}} placeholder="Username"/>
                        <input type="password" value={password} className="input-search" onChange={event =>{setPassword(event.target.value)}} placeholder="Password"/>
                    </form>
                    <p id='wrong' style={{'visibility':'hidden'}}>Wrong Password, reset password?</p>
                </div>
                <div className="form" id={!choiceLogin?'me':'notme'}>
                    <form>
                        <input type="text" value={username} className="input-search" onChange={event =>{setUsername(event.target.value)}} placeholder="Username" required/>
                        <input type="password" value={password} className="input-search" onChange={event =>{setPassword(event.target.value)}} placeholder="Password" required/>
                    </form>
                </div>
                <button id='cancel' onClick={(e)=>document.getElementById('login').style.visibility = 'hidden'}>Cancel</button>
                <button id='submit'onClick={(e)=>submit(e,username,password,choiceLogin)}>{choiceLogin?'Login':'Sign Up'}</button>
            </div>
        </div>
    )
}