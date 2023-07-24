
  import PersonService from '../service/personService.js'
  import personRepository from '../repository/personRepository.js'

  export default class PersonFactory {
    static getInstance() {
      const repository = new personRepository()
      const service = new PersonService({ repository })
      return service
    }
}