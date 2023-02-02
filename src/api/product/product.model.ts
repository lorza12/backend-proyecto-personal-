import { Schema, model } from "mongoose";

export interface ProductsDocument extends Document {
  tittle: string;
  image: string;
  quantity: string;
  speciality: string;
  reasonForConsultation: string;
  price: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductsSchema = new Schema(
  {
    tittle: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    quantity: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref:"user"
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Products = model<ProductsDocument>("products", ProductsSchema);

export default Products;