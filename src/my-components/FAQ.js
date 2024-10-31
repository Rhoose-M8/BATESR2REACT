import Questions from './faqs.json';
import { useState} from 'react';

function FAQ() {
    // Search state
    const [enteredKeywords, setEnteredKeywords] = useState('');

    // Handle search input change
    const inputChange = (event) => {
        setEnteredKeywords(event.target.value);
    };

    

    return (
        <>
            <div style={{ minHeight: '60vh' }}>
                <h1>Frequently Asked Questions</h1>
                {/* Search Box */}
                <div className='row'>
                    <input
                        className='col-11 m-3'
                        type='text'
                        name='search'
                        onChange={inputChange}
                        placeholder='Keywords'
                    />
                </div>

                {/* Filtered Questions */}
                <div>
                    {Questions.filter(
                        question =>
                            question.question.toLowerCase().includes(enteredKeywords.toLowerCase())
                            || question.answer.toLowerCase().includes(enteredKeywords.toLowerCase())
                    ).map((question) => (
                        <div className='bg-warning p-3 m-2' key={question.id}>
                            <h4>{question.question}</h4>
                            <p>{question.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FAQ;
