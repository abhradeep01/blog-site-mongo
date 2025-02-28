export const otpgenerate = () =>{
    var otp = Math.floor(Math.random()*1000000);
    
    if(otp.toString().length===5){
        return otpgenerate();
    }
    return otp;
}