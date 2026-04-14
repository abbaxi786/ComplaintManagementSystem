import User from "../../schema/user.model";
import { connectDB } from "../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { action, userName, email, password, phoneNo, pic } = await request.json();

    await connectDB();

    // VALIDATION
    if (action === "register") {
      if (userName.trim() === "" || email.trim() === "" || password.trim() === "") {
        return NextResponse.json({
          message: "Please fill all the fields",
          success: false,
        });
      }
    }
    else if (action === "login") {
      if (email.trim() === "" || password.trim() === "") {
        return NextResponse.json({
          message: "Please fill all the fields",
          success: false,
        });
      }
    }


    if (action === "register") {
      const userExist = await User.findOne({ email });

      if (userExist) {
        return NextResponse.json({
          message: "User already exists",
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        phoneNo,
        pic,
      });

      return NextResponse.json({
        message: "User Registered Successfully",
        data: newUser,
        success: true,
      });
    }

    // LOGIN
    if (action === "login") {
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({
          message: "User not found",
          success: false,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return NextResponse.json({
          message: "Invalid Password",
          success: false,
        });
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.jwtTokenSecret,
        { expiresIn: "1d" }
      );

      const response = NextResponse.json({
        message: "Login Successful",
        data: user,
        success: true,
      });

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,              // prevent JS access (security)
        secure: process.env.NODE_ENV === "production",  // only HTTPS in production
        sameSite: "lax",             // protect CSRF
           // available throughout site
        maxAge: 60 * 60 * 24 * 7,        // 7 days

      });

      return response;
    }

    if (action === "logout") {
      const response = NextResponse.json({
        message: "Logout Successful",
        success:true,
      });

      response.cookies.set({
        name: "token",
        value: "",
        maxAge: 0,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({
      message: "Invalid Action",
      success: false,
    });

  } catch (error) {

    console.log("Error in user route:", error.message);
    return NextResponse.json({
      message: "Error",
      error: error.message,
      success: false,
    });
  }
}

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ success: false,message:"The user is not log in" });
    }

    const decoded = jwt.verify(token, process.env.jwtTokenSecret);
    // console.log("The decoded "+JSON.stringify(decoded));
    return NextResponse.json({
      user: decoded
    });

  } catch (error) {
    return NextResponse.json({ success: false,message:error.message });
  }
}

