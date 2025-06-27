'use client';

import { chatMessages } from '@/components/ChatMessageWrapper'
import FeskButtonDropdown from '@/components/FeskButtonDropdown';
import FeskFieldsetInput from '@/components/FeskFieldsetInput';
import FeskFieldsetTextarea from '@/components/FeskFieldsetTextarea';
import FeskFieldset from '@/components/FeskFieldset';
import FeskFieldsetSubmit from '@/components/FeskFieldsetSubmit';
import FeskButtonPrimarySubmit from '@/components/FeskButtonPrimarySubmit';
import { SVG_ICON_LOAD, SVG_ICON_EDIT, SVG_ICON_SEND, DEVELOPER_PROMPT } from '@/config/FeskConstants'


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
    // myDiv.value = templateGeneric;
    myDiv.value = DEVELOPER_PROMPT;
    document.activeElement.blur();
  }

  return (
    <>

      <div className='chat-text-area-wrapper'>
        <form id='basic-chat-form' action={handleSubmit}>

          <div>

            <FeskFieldset label='&nbsp;' buttons='&nbsp;' align='items-center'>
              <FeskButtonDropdown name='load template' dropdownPosition='dropdown-right'>

                <ul id="promptTemplateDropdown" tabIndex={0} className="dropdown-content text-xs fesk-menu menu bg-zinc-800 z-1 w-50 mt-[2px] mb-[2px] ml-[5px] mr-[2px] shadow-sm">

                  <li className='fesk-menu-li'><a onClick={loadTemplate}>developer</a></li>
                  <li className='fesk-menu-li'><a>code generation</a></li>
                  <li className='fesk-menu-li-bottom'><a>agentic</a></li>

                </ul>

              </FeskButtonDropdown>
            </FeskFieldset>

            <FeskFieldsetInput label='Role' id='role' initialValue='user'>
              <FeskButtonDropdown name='edit' dropdownPosition='dropdown-bottom'>

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


            <FeskFieldset label='&nbsp;' buttons='&nbsp;' align='items-center'>

              <div className='flex items-center'>
                <div className='flex-none mt-[4px]'>
                  <input type="checkbox" id="websearch-enabled" name="websearch-enabled" value='false' className="" />
                </div>
                <div className='flex-none mt-[1px] ml-[10px]'>enable web search</div>
              </div>

            </FeskFieldset>


            <FeskFieldsetSubmit label='&nbsp;'>
              <FeskButtonPrimarySubmit label='Send' />
            </FeskFieldsetSubmit>


          </div>


        </form>
      </div>
    </>
  )
}

export default ChatForm
