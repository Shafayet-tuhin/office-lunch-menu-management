import React, { useRef } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import emailjs from "@emailjs/browser";
import Swal from 'sweetalert2'

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_pwdgpns", "template_bn6ywdr", form.current, {
        publicKey: "zTdhlE9SzsVH8drfn",
      })
      .then(
        () => {
          Swal.fire({
            title: "Message sent successfully",
            icon: "success"
          });
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );

    e.target.reset();
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className='flex flex-col items-center gap-4 mb-12'>
        <p className='text-[#D99904] italic text-xl font-normal'>---Send Us a Message---</p>
        <hr className='w-32 md:w-56' />
        <p className='text-[#151515] font-normal text-2xl md:text-3xl lg:text-4xl font-abc'>CONTACT FORM</p>
        <hr className='w-36 md:w-60' />
      </div>

      <div>
        <form className='grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-12 lg:p-20 bg-[#F3F3F3] rounded-xl mb-32' ref={form} onSubmit={sendEmail}>
          <div>
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">Name</span>
            </label>
            <input type="text" name="user_name" placeholder="Enter Your name" className="w-full text-xl py-2 md:py-4 px-4 md:px-6 border rounded-lg" required />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">Email</span>
            </label>
            <input type="email" name="user_email" placeholder="Enter Your E-mail" className="w-full text-xl py-2 md:py-4 px-4 md:px-6 border rounded-lg" required />
          </div>

          <div className='md:col-span-2'>
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">Phone</span>
            </label>
            <input type="tel" name='user_number' placeholder="Enter Your Number" className="w-full text-xl py-2 md:py-4 px-4 md:px-6 border rounded-lg" required />
          </div>

          <div className='md:col-span-2'>
            <label className="label">
              <span className="label-text text-[#444444] text-xl font-semibold">Message</span>
            </label>
            <textarea placeholder="Enter Your Message" name="message" className="w-full text-xl h-40 md:h-60 py-2 md:py-4 px-4 md:px-6 border rounded-lg resize-none" required />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button type="submit" value="Send">
              <div className='flex gap-3 items-center hover:bg-slate-600 px-6 py-2 md:py-4 text-xl font-semibold hover:text-white rounded-xl bg-slate-800 text-orange-400'>
                Send Message <RiSendPlaneFill className='text-blue-400' />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
