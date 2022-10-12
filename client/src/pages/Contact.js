import React, { useState } from 'react';
import { send } from 'emailjs-com';

function ContactForm() {
    const [toSend, setToSend] = useState({
        from_name: '',
        message: '',
        reply_to: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        send(
            'service_6e8yzfw',
            'template_elh50uy',
            toSend,
            'i4SN20Ncp0wQIf0U5'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setToSend({
                    from_name: '',
                    message: '',
                    reply_to: '',
                });
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
    };

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <div id="contact" className='mx-auto'>
            <h4>Contact me</h4>

            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='from_name'
                    placeholder='Your name'
                    value={toSend.from_name}
                    onChange={handleChange}
                    className='form-control'
                />
                <input
                    type='text'
                    name='message'
                    placeholder='Your message'
                    value={toSend.message}
                    onChange={handleChange}
                    className='form-control'
                />
                <input
                    type='text'
                    name='reply_to'
                    placeholder='Your email'
                    value={toSend.reply_to}
                    onChange={handleChange}
                    className='form-control'
                />
                <button type='submit' className="button1">Submit</button>
            </form>
        </div>
    );
}

export default ContactForm;
