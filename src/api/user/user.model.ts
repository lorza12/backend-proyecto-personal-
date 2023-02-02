import { Schema, model, Document } from "mongoose";
import { userProfileType } from "./user.types";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  phone: string;
  isActive: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  profile: userProfileType;
  comparePassword: (passsword: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    phone: {
      type: String,
      require: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref:"user"
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", async function save(next: Function) {
  const user = this as UserDocument;

  try {
    if (!user.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error: any) {
    next(error);
  }
});

UserSchema.virtual("profile").get(function profile() {
  const { firstName, lastName, email, role } =
    this;

  return {
    firstName,
    lastName,
    email,
    role,
  };
});

async function comparePassword(
  this: UserDocument,
  candidatePassword: string,
  next: Function
) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);

    return isMatch;
  } catch (error: any) {
    next(error);
    return false;
  }
}

UserSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>("user", UserSchema);

export default User;
