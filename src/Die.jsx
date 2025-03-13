export default function Die(props){
    console.log("isHeld:", props.isHeld);
    return(
        <button 
        style={{backgroundColor:props.isHeld ? "#59E391" : "white"}}
        onClick={props.hold}>
         {props.value}
        </button>
    )
} 