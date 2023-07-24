
  import ProductService from '../service/productService.js'
  import productRepository from '../repository/productRepository.js'

  export default class ProductFactory {
    static getInstance() {
      const repository = new productRepository()
      const service = new ProductService({ repository })
      return service
    }
}