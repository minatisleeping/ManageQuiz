import './ManageQuiz.scss'
import { useState } from 'react'
import Select from 'react-select'
import { createNewQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify'
import TableQuiz from './TableQuiz'
import Accordion from 'react-bootstrap/Accordion'
import QuizQA from './QuizQA'
import AssignQuiz from './AssignQuiz'

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
]

const ManageQuiz = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('EASY')
  const [image, setImage] = useState(null)

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  const handleSubmitQuiz = async () => {
    if (!name) return toast.error('Name is required!')
    if (!description) return toast.error('Description is required!')
    
    const res = await createNewQuiz(description, name, type?.value, image)
    if (res && res.EC === 0) {
      toast.success('Create quiz successfully!')
      setName('')
      setDescription('')
      setImage(null)
    } else {
      toast.error(res.EM)
    }
  }

  return(
    <div className='quiz-container'>
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Manage Quiz</Accordion.Header>
          <Accordion.Body>
            <div className='add-new'>
              <fieldset className='border rounded-3 p-3'>
                <legend className='float-none w-auto px-3'>Add new Quiz</legend>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='..'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='..'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className='my-3'>
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder='Quiz type..'
                  />
                </div>
                <div className='more-actions form-group'>
                  <label className='mb-2'>Upload Image</label> <br />
                  <input
                    style={{ cursor:'pointer' }}
                    type='file'
                    className='form-control'
                    onChange={(event) => handleChangeFile(event)}
                  />
                </div>
                <div className='mt-3 d-flex justify-content-center'>
                  <button
                    style={{ cursor:'pointer' }}
                    className='btn btn-warning w-100 fw-bold'
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>

            <div className='list-detail'>
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Update Q/A Quiz</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
 
export default ManageQuiz
