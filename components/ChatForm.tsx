'use client';

import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButtonDropdown from '@/components/FeskButtonDropdown';
import FeskFieldsetInput from '@/components/FeskFieldsetInput';
import FeskFieldsetTextarea from '@/components/FeskFieldsetTextarea';
import FeskFieldset from '@/components/FeskFieldset';
import FeskFieldsetSubmit from '@/components/FeskFieldsetSubmit';
import FeskButtonPrimary from '@/components/FeskButtonPrimary';


const ChatForm = ({ templateGeneric }
  : { templateGeneric: string }) => {
  const { addChatMessage } = chatMessages()

  const handleSubmit = async (formData: FormData, e?: any) => {
    e?.preventDefault()

    const roleValue = document.getElementById('role')?.value;
    const contentValue = document.getElementById('content')?.value;
    const modelValue = document.getElementById('model')?.value;
    const temperatureValue = document.getElementById('temperature')?.value;
    const websearchEnabled = document.getElementById("websearch-enabled")?.checked;

    if (contentValue) {
      const mapOfFormData = {
        content: contentValue,
        role: roleValue,
        model: modelValue,
        temperature: temperatureValue,
        websearchEnabled: websearchEnabled
      }

      const myData = JSON.stringify(mapOfFormData, null, 2)

      // alert(myData)
      console.log(myData);

      addChatMessage(mapOfFormData);
      const myDiv = document.getElementById('content');
      myDiv.value = '';

    } else {
      alert('Please enter a query.')
    }
  }

  const updateInputForDropdown = (id: string, value: string) => {
    const myDiv = document.getElementById(id);
    myDiv.value = value;
    document.activeElement.blur();
  }

  const loadTemplate = async (e?: any) => {
    e?.preventDefault()
    const myDiv = document.getElementById('content');
    myDiv.value = templateGeneric;
    document.activeElement.blur();
  }

  const svgIconLoadTemplate = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm9 4.094l-.719.687l-6 6l1.438 1.438L16 13.937l5.281 5.282l1.438-1.438l-6-6z" /></svg>);
  const svgIconEdit = (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z" /><path fill="currentColor" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" /></svg>);
  const svgIconSend = (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="M5 5v22h22V5zm2 2h18v18H7zm7.219 2.281L12.78 10.72L18.062 16l-5.28 5.281l1.437 1.438l6-6l.687-.719l-.687-.719z" /></svg>);

  return (
    <>

      <div className='chat-text-area-wrapper'>
        <form id='basic-chat-form' action={handleSubmit}>

          <div>

            <FeskFieldset label='&nbsp;'>
              <FeskButtonDropdown name='load template' icon={svgIconLoadTemplate} dropdownPosition='dropdown-right'>

                <ul id="promptTemplateDropdown" tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[2px] mb-[2px] ml-[5px] mr-[2px] shadow-sm">

                  <li className='fesk-menu-li'><a onClick={loadTemplate}>generic</a></li>
                  <li className='fesk-menu-li'><a>code generation</a></li>
                  <li className='fesk-menu-li-bottom'><a>agentic</a></li>

                </ul>

              </FeskButtonDropdown>
            </FeskFieldset>

            <FeskFieldsetInput label='Role' id='role' initialValue='user'>
              <FeskButtonDropdown name='Edit' icon={svgIconEdit} dropdownPosition='dropdown-bottom'>

                <ul tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-10 w-40 mt-[5px] mb-[2px] ml-[2px] mr-[2px] shadow-sm">
                  <li className='fesk-menu-li'><a onClick={() => updateInputForDropdown('role', 'user')}>user</a></li>
                  <li className='fesk-menu-li-bottom'><a onClick={() => updateInputForDropdown('role', 'developer')}>developer</a></li>
                </ul>

              </FeskButtonDropdown>
            </FeskFieldsetInput>


            <FeskFieldsetInput label='Model' id='model' initialValue='gpt-4.1'>
              &nbsp;
            </FeskFieldsetInput>


            <FeskFieldsetInput label='Temperature' id='temperature' initialValue='1'>
              &nbsp;
            </FeskFieldsetInput>


            <FeskFieldsetTextarea label='Content' id='content' initialValue='Enter your message here...' rowsNum='10' >
              &nbsp;
            </FeskFieldsetTextarea>


            <FeskFieldset label='&nbsp;'>

              <div className='flex items-center'>
                <div className='flex-none mt-[4px]'>
                  <input type="checkbox" id="websearch-enabled" name="websearch-enabled" value='false' className="" />
                </div>
                <div className='flex-none mt-[1px] ml-[10px]'>enable web search</div>
              </div>

            </FeskFieldset>


            <FeskFieldsetSubmit label='&nbsp;'>
              <FeskButtonPrimary label='Send' icon={svgIconSend} />
            </FeskFieldsetSubmit>


          </div>


        </form>
      </div>
    </>
  )
}

export default ChatForm
