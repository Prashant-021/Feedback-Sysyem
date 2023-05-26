import React, { useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import Question from './Question';
import { TrashIcon } from "@heroicons/react/24/solid";
import { ComponentData, IFormTemplate, IQuestion } from '../../interface';
import FormHeader from './formFields/FormHeader';

type Props = {};



const Createform = (props: Props) => {

  const bottomRef = useRef<HTMLDivElement>(null);

  const categoryHeaderRef = useRef<{ title: string, description: string }>({ title: 'Title', description: 'Description' });
  // const categoryQuestionRef = useRef<IQuestion>();
  const [createdComponents, setCreatedComponents] = useState<ComponentData[]>([]);
  
  const [formTemplate, setFormTemplate] = useState<IFormTemplate>({
    title: '',
    description: '',
    questions: [{
      questionTitle: '',
      type: ''
    }]
  })
  const handleClick = () => {
    const newComponent: ComponentData = {
      id: Date.now(),
      contentValue: '',
    };
    setCreatedComponents(prevComponents => [...prevComponents, newComponent]);

    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 10);


  };

  const handleDelete = (index: number) => {
    const updatedComponents = [...createdComponents];
    updatedComponents.splice(index, 1);
    setCreatedComponents(prevComponents => {
      const updatedComponents = [...prevComponents];
      updatedComponents.splice(index, 1);
      return updatedComponents;
    });
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedComponents = [...createdComponents];
    updatedComponents[index].contentValue = value;
    setCreatedComponents(updatedComponents);
  };


  const handleHeaderInfo = (formHead: { title: string; description: string; }) => {
    categoryHeaderRef.current.title = formHead.title;
    categoryHeaderRef.current.description = formHead.description;
  }
  const setQuestionsInfo = () => {
    createdComponents.forEach((createdComponent) => {
      createdComponent.contentValue = 'adfews'
    })
  }
  console.log(createdComponents);
  const handleSave = () => {
    setQuestionsInfo()
    setFormTemplate(() => {
      const updatedFormTemplate: IFormTemplate = {
        title: categoryHeaderRef.current.title,
        description: categoryHeaderRef.current.description,
        questions: [
          {
            questionTitle: 'Question 1',
            type: 'shortAnswer',
          },
          {
            questionTitle: 'Question 2',
            type: 'Mcq',
            options: [
              { optionValue: 'option 1' },
              { optionValue: 'option 2' },
            ],
          },
        ],
      };
  
      console.log(updatedFormTemplate, createdComponents);
      return updatedFormTemplate;
    });
  };
  
  return (
    <div className='w-full min-h-min flex flex-col flex-grow items-center'>
      <div className='my-4 w-[90%] md:w-[70%]'>
        <Button className='float-right' onClick={handleSave}>Save</Button>
      </div>
      <div id='questionList' className='w-[90%] md:w-[70%] flex lg:flex flex-grow flex-col h-[60vh] overflow-y-scroll  no-scrollbar  gap-4 relative'>
        <FormHeader headerInfo={handleHeaderInfo} />
        {createdComponents.map((component, index) => {

          return (

            <div key={component.id} className=' rounded-lg shadow-xl border-l-8 border-transparent focus-within:border-blue-500 bg-white p-2 md:p-11 h-fit'>
              <Question
                value={component.contentValue}
                onChange={(value) => handleQuestionChange(index, value)}
              />
              <div>

                <Button
                  variant="text"
                  className=' text-red-500 p-2 rounded-md float-right'
                  onClick={() => handleDelete(index)}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )
        })}

        <div ref={bottomRef} />
      </div>
      <div className='flex justify-center mb-2 rounded-md'>
        <Button className=' flex items-center  p-3 bg-white text-black' onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> Add Question
        </Button>
      </div>

    </div>
  );
};

export default Createform;
