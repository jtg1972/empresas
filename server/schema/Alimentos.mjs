
import {gql} from 'apollo-server-express'

export default gql`
  type Alimentos{
    id:Int!
    grasas:Int
proteinas:Int
colesterol:Int

  }

  type Query{
    Alimentos:[Alimentos]
    
  }
  type Mutation{
    createAlimentos(
      grasas:Int,
proteinas:Int,
colesterol:Int,

      ):Alimentos
    
    
  }`
