import { Document, Schema, Model, model } from 'mongoose'
import { ICustomer } from './interfaces/customer.interface'
import { email } from './contracts'

export interface ICustomerModel extends ICustomer, Document { }

export const CustomerSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 60,
        lowercase: true,
        trim: true
    },
    email: {
        ...email,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const User: Model<ICustomerModel> = model<ICustomerModel>('Customer', CustomerSchema)
