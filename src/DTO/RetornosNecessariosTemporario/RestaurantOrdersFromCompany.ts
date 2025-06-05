import { OrderStatus } from "../../enums/enums"

interface RestauranteOrder {
  code: string,
  company: {
    name: string,
  }
  createAt: Date,
  status: OrderStatus,
  collaboratorsOrders: [{
    image: string,
    dishName: string
    collaboratorName: string
    quantity: number,
    price: number
    status: OrderStatus
  }],
}