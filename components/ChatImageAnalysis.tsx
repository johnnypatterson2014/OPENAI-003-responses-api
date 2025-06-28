'use client';

import FeskButtonSecondary from '@/components/FeskButtonSecondary';
import { chatMessages } from '@/components/ChatMessageWrapper'
import { Input } from "@/components/ui/input";
import FeskButtonPrimarySubmit from '@/components/FeskButtonPrimarySubmit';
import { TextArea } from '@apideck/components'
import { useState } from 'react'

const ChatImageAnalysis = () => {
  const { addChatMessage } = chatMessages()
  const [content, setContent] = useState('What is in this image?')
  const [imageUrl, setImageUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg')

  const handleSubmit = async (formData: FormData, e?: any) => {
    e?.preventDefault();
    // const requestContent = document.getElementById('requestContent')?.value;
    // const requestContent = formData.get("requestContent");

    if (content) {
      const mapOfFormData = {
        content: content,
        role: 'user',
        model: 'gpt-4.1-mini',
        temperature: '1',
        imageAnalysis: true,
        imageUrl: imageUrl
      }

      console.log(JSON.stringify(mapOfFormData, null, 2));
      addChatMessage(mapOfFormData);
      setContent('');
      setImageUrl('');

    } else {
      // alert('Please enter a query.')
    }
  }

  return (
    <>

      <div className='chat-text-area-wrapper'>
        <form id='analyze_image' action={handleSubmit}>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-zinc-300 text-sm font-medium">Analyze image</div>
            </div>
            <div className="mt-3 space-y-3 text-zinc-400">


              <div className="flex items-start gap-2">
                <label htmlFor="server_label" className="text-sm w-24 mt-[8px]">
                  Image URL
                </label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="text"
                  className="bg-zinc-900 border border-zinc-600 text-sm flex-1 text-zinc-300"
                  value={imageUrl}
                  onChange={(e: any) => setImageUrl(e.target.value)}
                />
              </div>


              <div className="flex items-start gap-2">
                <label htmlFor="server_url" className="text-sm w-24 mt-[8px]">
                  Prompt
                </label>
                <TextArea
                  id="requestContent"
                  name="requestContent"
                  placeholder="Enter your message here..."
                  rows={4}
                  value={content}
                  className="!p-3 text-zinc-300 bg-zinc-900 border border-zinc-600 text-sm focus:outline-none focus:ring-1 flex-1"
                  onChange={(e: any) => setContent(e.target.value)}
                />

              </div>

              <div>
                <div className='grid grid-flow-col justify-items-end'>
                  <div className='m-[2px]'>
                    <FeskButtonPrimarySubmit label='Send' />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </form>
      </div>
    </>
  )
}

export default ChatImageAnalysis
