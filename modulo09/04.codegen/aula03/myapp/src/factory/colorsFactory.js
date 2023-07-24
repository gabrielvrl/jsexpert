
  import ColorsService from '../service/colorsService.js'
  import colorsRepository from '../repository/colorsRepository.js'

  export default class ColorsFactory {
    static getInstance() {
      const repository = new colorsRepository()
      const service = new ColorsService({ repository })
      return service
    }
}