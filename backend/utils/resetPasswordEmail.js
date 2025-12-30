import nodemailer from 'nodemailer'

export const sendOtpMail = async (email,otp)=>{

    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth:{
              user : process.env.USER_EMAIL,
            pass : process.env.USER_PASSWORD
        }
    })

    const mailConfigurations = {
        from : process.env.USER_EMAIL,
        to : email,
          subject : "Your Password Reset OTP",
          text :  `Your One-Time Password (OTP) for password reset is: ${otp}\n\nThis OTP is valid for 10 minutes.`
    }

    try {
        const info = await transporter.sendMail(mailConfigurations)
         console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("OTP email sending failed:", error);
        // Throw the error so the calling function can catch and handle it.
        throw new Error("Failed to send OTP email.");
    }
}