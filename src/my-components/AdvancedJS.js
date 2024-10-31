import React, { useState, useEffect } from 'react';

// Sample accessory data with images
const accessories = [
    { id: 1, name: "Phone Case", category: "Cases", price: 15, description: "Durable phone case", image_url: require('./Images/phone_case.jpg') },
    { id: 2, name: "Screen Protector", category: "Screen Protectors", price: 10, description: "Anti-scratch screen protector", image_url: require('./Images/screen_protector.jpg') },
    { id: 3, name: "Wireless Charger", category: "Chargers", price: 25, description: "Fast wireless charger", image_url: require('./Images/wireless_charger.jpg') },
    { id: 4, name: "Portable Power Bank", category: "Chargers", price: 30, description: "5000mAh power bank", image_url: require('./Images/power_bank.jpg') },
    { id: 5, name: "Bluetooth Earbuds", category: "Audio", price: 50, description: "Noise-cancelling earbuds", image_url: require('./Images/earbuds.jpg') },
    { id: 6, name: "Car Mount", category: "Accessories", price: 20, description: "Magnetic car mount", image_url: require('./Images/car_mount.jpg') },
    { id: 7, name: "USB-C Cable", category: "Cables", price: 8, description: "High-speed USB-C cable", image_url: require('./Images/usb_cable.jpg') },
    { id: 8, name: "Memory Card", category: "Storage", price: 20, description: "128GB memory card", image_url: require('./Images/memory_card.jpg') },
    { id: 9, name: "Pop Socket", category: "Accessories", price: 5, description: "Phone grip and stand", image_url: require('./Images/pop_socket.jpg') },
    { id: 10, name: "Headphone Adapter", category: "Audio", price: 12, description: "3.5mm headphone adapter", image_url: require('./Images/headphone_adapter.jpg') }
];

// OnlineShop Component
function OnlineShop() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [likedItems, setLikedItems] = useState(() => JSON.parse(localStorage.getItem('likedItems')) || {});
    const [dislikedItems, setDislikedItems] = useState(() => JSON.parse(localStorage.getItem('dislikedItems')) || {});
    const [comments, setComments] = useState(() => JSON.parse(localStorage.getItem('comments')) || {});
    const [selectedAccessory, setSelectedAccessory] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
        localStorage.setItem('dislikedItems', JSON.stringify(dislikedItems));
    }, [likedItems, dislikedItems]);

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const addToCart = (accessory) => {
        setCart((prevCart) => [...prevCart, accessory]);
    };

    const handleLike = (id) => {
        setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
        setDislikedItems((prev) => ({ ...prev, [id]: false }));
    };

    const handleDislike = (id) => {
        setDislikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
        setLikedItems((prev) => ({ ...prev, [id]: false }));
    };

    const postComment = (id) => {
        if (newComment) {
            setComments((prevComments) => ({
                ...prevComments,
                [id]: [...(prevComments[id] || []), { text: newComment, author: "Anonymous User", profileImage: require('./Images/default_user-icon.jpg') }]
            }));
            setNewComment('');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '1em', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1em' }}>
                    <input type="text" placeholder="Search accessories..." />
                    <select>
                        <option value="default">Sort by</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                    </select>
                    <select>
                        <option value="All">All Categories</option>
                        <option value="Cases">Cases</option>
                        <option value="Screen Protectors">Screen Protectors</option>
                        <option value="Chargers">Chargers</option>
                        <option value="Audio">Audio</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Cables">Cables</option>
                        <option value="Storage">Storage</option>
                    </select>
                </div>
                <button onClick={() => setCartModalOpen(true)}>Cart ({cart.length})</button>
            </div>

            {cartModalOpen && (
                <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', backgroundColor: 'white', border: '1px solid #ccc', padding: '2em', zIndex: '1000', width: '300px' }}>
                    <h3>Shopping Cart</h3>
                    <ul>{cart.map((item, index) => <li key={index}>{item.name} - ${item.price}</li>)}</ul>
                    <button onClick={() => setCartModalOpen(false)}>Close</button>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1em' }}>
                {accessories.map(accessory => (
                    <div key={accessory.id} style={{ border: '1px solid #ccc', padding: '1em', textAlign: 'center' }}>
                        <h4 onClick={() => setSelectedAccessory(accessory)} style={{ cursor: 'pointer' }}>{accessory.name}</h4>
                        <img src={accessory.image_url} alt={accessory.name} style={{ width: '100px', height: '100px', cursor: 'pointer' }} onClick={() => setSelectedAccessory(accessory)} />
                        <p>Price: ${accessory.price}</p>
                        <button onClick={() => addToCart(accessory)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {selectedAccessory && (
                <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', backgroundColor: 'white', border: '1px solid #ccc', padding: '2em', zIndex: '1000', width: '300px' }}>
                    <h3>{selectedAccessory.name}</h3>
                    <img src={selectedAccessory.image_url} alt={selectedAccessory.name} style={{ width: '100%', height: 'auto' }} />
                    <p>Price: ${selectedAccessory.price}</p>
                    <p>{selectedAccessory.description}</p>
                    <button onClick={() => addToCart(selectedAccessory)}>Add to Cart</button>
                    <div>
                        <button onClick={() => handleLike(selectedAccessory.id)} style={{ backgroundColor: likedItems[selectedAccessory.id] ? 'green' : 'gray', color: 'white', marginRight: '5px' }}>Like</button>
                        <button onClick={() => handleDislike(selectedAccessory.id)} style={{ backgroundColor: dislikedItems[selectedAccessory.id] ? 'red' : 'gray', color: 'white' }}>Dislike</button>
                    </div>
                    <h4>Comments</h4>
                    <ul>
                        {(comments[selectedAccessory.id] || []).map((comment, index) => (
                            <li key={index}>
                                <img src={comment.profileImage} alt="Profile" style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px' }} />
                                <strong>{comment.author}: </strong>{comment.text}
                            </li>
                        ))}
                    </ul>
                    <textarea placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} rows="3" style={{ display: 'block', width: '100%', marginBottom: '1em' }} />
                    <button onClick={() => postComment(selectedAccessory.id)}>Post Comment</button>
                    <button onClick={() => setSelectedAccessory(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

function DiscussionBoard() {
    const [threads, setThreads] = useState(() => JSON.parse(localStorage.getItem('discussionThreads')) || []);
    const [newThreadTitle, setNewThreadTitle] = useState('');
    const [newThreadContent, setNewThreadContent] = useState('');
    const [expandedThreadId, setExpandedThreadId] = useState(null);
    const [editingThread, setEditingThread] = useState(null);
    const [editingReply, setEditingReply] = useState(null);
    const [showCreateThreadForm, setShowCreateThreadForm] = useState(false);
    const [replyingToThreadId, setReplyingToThreadId] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState('');

    // Save threads to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('discussionThreads', JSON.stringify(threads));
    }, [threads]);

    // Create a new thread
    const createThread = () => {
        if (!newThreadTitle || !newThreadContent) return;

        const newThread = {
            id: Date.now(),
            title: newThreadTitle,
            content: newThreadContent,
            replies: [],
            user: 'Anonymous User',
            profileImage: require('./Images/default_user-icon.jpg')
        };

        setThreads([...threads, newThread]);
        setNewThreadTitle('');
        setNewThreadContent('');
        setShowCreateThreadForm(false); // Hide form after creation
    };

    // Open the edit thread form
    const editThread = (thread) => {
        setEditingThread({ ...thread });
    };

    // Save edited thread
    const saveEditedThread = () => {
        const updatedThreads = threads.map((thread) =>
            thread.id === editingThread.id ? { ...thread, content: editingThread.content } : thread
        );
        setThreads(updatedThreads);
        setEditingThread(null);
    };

    // Delete thread
    const deleteThread = (threadId) => {
        const updatedThreads = threads.filter((thread) => thread.id !== threadId);
        setThreads(updatedThreads);
    };

    // Add a reply
    const addReply = (threadId) => {
        if (!newReplyContent) return;

        const updatedThreads = threads.map((thread) => {
            if (thread.id === threadId) {
                return {
                    ...thread,
                    replies: [
                        ...thread.replies,
                        {
                            id: Date.now(),
                            content: newReplyContent,
                            user: 'Anonymous User',
                            profileImage: require('./Images/default_user-icon.jpg')
                        }
                    ]
                };
            }
            return thread;
        });

        setThreads(updatedThreads);
        setNewReplyContent(''); // Clear reply content
        setReplyingToThreadId(null); // Hide reply box
    };

    // Open the edit reply form
    const editReply = (threadId, reply) => {
        setEditingReply({ ...reply, threadId });
    };

    // Save edited reply
    const saveEditedReply = () => {
        const updatedThreads = threads.map((thread) => {
            if (thread.id === editingReply.threadId) {
                return {
                    ...thread,
                    replies: thread.replies.map((reply) =>
                        reply.id === editingReply.id ? { ...reply, content: editingReply.content } : reply
                    )
                };
            }
            return thread;
        });

        setThreads(updatedThreads);
        setEditingReply(null);
    };

    // Delete reply
    const deleteReply = (threadId, replyId) => {
        const updatedThreads = threads.map((thread) => {
            if (thread.id === threadId) {
                return {
                    ...thread,
                    replies: thread.replies.filter((reply) => reply.id !== replyId)
                };
            }
            return thread;
        });

        setThreads(updatedThreads);
    };

    // Toggle thread expansion
    const toggleThread = (threadId) => {
        setExpandedThreadId(expandedThreadId === threadId ? null : threadId);
    };

    return (
        <div>
            <h2>Discussion Board</h2>

            {/* Create New Thread Button */}
            <button onClick={() => setShowCreateThreadForm(!showCreateThreadForm)}>
                {showCreateThreadForm ? "Cancel" : "Create New Thread"}
            </button>

            {/* Create New Thread Form */}
            {showCreateThreadForm && (
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h3>Create New Thread</h3>
                    <input
                        type="text"
                        placeholder="Thread Title"
                        value={newThreadTitle}
                        onChange={(e) => setNewThreadTitle(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                    />
                    <textarea
                        placeholder="Thread Content"
                        value={newThreadContent}
                        onChange={(e) => setNewThreadContent(e.target.value)}
                        rows="4"
                        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                    />
                    <button onClick={createThread}>Create Thread</button>
                </div>
            )}

            {/* Edit Thread Form */}
            {editingThread && (
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h3>Edit Thread</h3>
                    <textarea
                        value={editingThread.content}
                        onChange={(e) => setEditingThread({ ...editingThread, content: e.target.value })}
                        rows="4"
                        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                    />
                    <button onClick={saveEditedThread}>Save</button>
                    <button onClick={() => setEditingThread(null)}>Cancel</button>
                </div>
            )}

            {/* Edit Reply Form */}
            {editingReply && (
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h3>Edit Reply</h3>
                    <textarea
                        value={editingReply.content}
                        onChange={(e) => setEditingReply({ ...editingReply, content: e.target.value })}
                        rows="2"
                        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                    />
                    <button onClick={saveEditedReply}>Save</button>
                    <button onClick={() => setEditingReply(null)}>Cancel</button>
                </div>
            )}

            {/* Display Threads */}
            <h3>Threads</h3>
            <ul>
                {threads.map((thread) => (
                    <li key={thread.id} style={{ marginBottom: '10px' }}>
                        <strong onClick={() => toggleThread(thread.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {thread.title}
                        </strong>
                        {expandedThreadId === thread.id && (
                            <div style={{ marginTop: '10px', marginLeft: '20px' }}>
                                <div>
                                    <img src={thread.profileImage} alt="Profile" style={{ width: '20px', marginRight: '5px' }} />
                                    <strong>{thread.user}</strong>
                                </div>
                                <p>{thread.content}</p>
                                <button onClick={() => editThread(thread)}>Edit</button>
                                <button onClick={() => deleteThread(thread.id)}>Delete</button>

                                <h5>Replies</h5>
                                <ul>
                                    {thread.replies.map((reply) => (
                                        <li key={reply.id} style={{ marginBottom: '10px' }}>
                                            <div>
                                                <img src={reply.profileImage} alt="Profile" style={{ width: '20px', marginRight: '5px' }} />
                                                <strong>{reply.user}</strong>
                                            </div>
                                            <p>{reply.content}</p>
                                            <button onClick={() => editReply(thread.id, reply)}>Edit</button>
                                            <button onClick={() => deleteReply(thread.id, reply.id)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>

                                {/* Reply Button and Form */}
                                <button onClick={() => setReplyingToThreadId(replyingToThreadId === thread.id ? null : thread.id)}>
                                    {replyingToThreadId === thread.id ? "Cancel" : "Reply"}
                                </button>
                                {replyingToThreadId === thread.id && (
                                    <div style={{ marginTop: '10px' }}>
                                        <textarea
                                            placeholder="Add a reply"
                                            value={newReplyContent}
                                            onChange={(e) => setNewReplyContent(e.target.value)}
                                            rows="2"
                                            style={{ display: 'block', marginBottom: '10px', width: '100%' }}
                                        />
                                        <button onClick={() => addReply(thread.id)}>Submit Reply</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SamsungSlideshow() {
    const samsungPhones = [
        { id: 0, name: "Samsung Galaxy A10", image_url: require('./Images/a10.jpg') },
        { id: 1, name: "Samsung Galaxy A12", image_url: require('./Images/a12.jpg') },
        { id: 2, name: "Samsung Galaxy S10", image_url: require('./Images/s10.jpg') },
        { id: 3, name: "Samsung Galaxy S12", image_url: require('./Images/s12.jpg') },
        { id: 4, name: "Samsung Galaxy S22", image_url: require('./Images/s22.jpg') }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoSlide, setAutoSlide] = useState(0);

    useEffect(() => {
        const savedSlide = localStorage.getItem('lastViewedSlide');
        if (savedSlide !== null) {
            setCurrentSlide(JSON.parse(savedSlide));
            setAutoSlide(JSON.parse(savedSlide));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('lastViewedSlide', JSON.stringify(autoSlide));
    }, [autoSlide]);

    useEffect(() => {
        const interval = setInterval(() => {
            setAutoSlide((prevSlide) => (prevSlide + 1) % samsungPhones.length);
        }, 1500);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Disables the warning for samsungPhones.length

    const nextSlide = () => setCurrentSlide((prevSlide) => (prevSlide + 1) % samsungPhones.length);
    const prevSlide = () => setCurrentSlide((prevSlide) => (prevSlide - 1 + samsungPhones.length) % samsungPhones.length);

    return (
        <div className="row justify-content-between">
            <div className="col-lg-6 col-md-12 mb-4">
                <h4>Manual Slideshow</h4>
                <div className="slideshow-container">
                    <img
                        src={samsungPhones[currentSlide].image_url}
                        alt={samsungPhones[currentSlide].name}
                        style={{ width: 'auto', height: '50vh' }}
                    />
                    <p>{samsungPhones[currentSlide].name}</p>
                    <div>
                        <button onClick={prevSlide}>Previous</button>
                        <button onClick={nextSlide}>Next</button>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 col-md-12 mb-4">
                <h4>Automatic Slideshow</h4>
                <div className="slideshow-container">
                    <img
                        src={samsungPhones[autoSlide].image_url}
                        alt={samsungPhones[autoSlide].name}
                        style={{ width: 'auto', height: '50vh' }}
                    />
                    <p>{samsungPhones[autoSlide].name}</p>
                </div>
            </div>
        </div>
    );
}

function AdvancedJS() {
    const setActiveDemo = (demo) => {
        localStorage.setItem('lastViewedDemo', demo);
    };

    useEffect(() => {
        const lastViewedDemo = localStorage.getItem('lastViewedDemo');
        if (lastViewedDemo) {
            setActiveDemo(lastViewedDemo);
        }

        const Demo1Button = document.getElementById('Demo1Button');
        const Demo2Button = document.getElementById('Demo2Button');
        const Demo3Button = document.getElementById('Demo3Button');
        const Demo1Div = document.getElementById('Demo1Div');
        const Demo2Div = document.getElementById('Demo2Div');
        const Demo3Div = document.getElementById('Demo3Div');

        function setActiveButton(activeButton) {
            [Demo1Button, Demo2Button, Demo3Button].forEach(btn => btn.classList.remove('active'));
            activeButton.classList.add('active');
        }

        function showDiv(divToShow) {
            [Demo1Div, Demo2Div, Demo3Div].forEach(div => div.classList.remove('show'));
            divToShow.classList.add('show');
        }

        showDiv(Demo1Div);
        setActiveButton(Demo1Button);

        Demo1Button.addEventListener('click', () => {
            showDiv(Demo1Div);
            setActiveButton(Demo1Button);
            setActiveDemo('Demo1Div');
        });

        Demo2Button.addEventListener('click', () => {
            showDiv(Demo2Div);
            setActiveButton(Demo2Button);
            setActiveDemo('Demo2Div');
        });

        Demo3Button.addEventListener('click', () => {
            showDiv(Demo3Div);
            setActiveButton(Demo3Button);
            setActiveDemo('Demo3Div');
        });
    }, []);

    return (
        <>
            <style>
                {`
                    .btn-custom {
                        background-color: blue;
                        border: 1px solid yellow;
                        border-radius: 20px;
                        color: yellow;
                        margin-bottom: 5px;
                    }
                    .btn-custom.active {
                        background-color: #FFC107;
                    }
                    .btn-custom:hover {
                        border: 1px solid black;
                        opacity: 1;
                        transition: none;
                    }
                    .collapse {
                        display: none;
                    }
                    .collapse.show {
                        display: block;
                    }
                `}
            </style>

            <div className="row container-fluid" style={{ minHeight: '60vh' }}>
                <div className="col-12 col-md-3" style={{ backgroundColor: 'blue' }}>
                    <div className="row justify-content-md-start mx-0 mx-sm-auto ms-md-2">
                        <button id="Demo1Button" className="col-6 col-md-12 btn btn-custom active" type="button">DEMO 1</button>
                        <button id="Demo2Button" className="col-6 col-md-12 btn btn-custom" type="button">DEMO 2</button>
                        <button id="Demo3Button" className="col-6 col-md-12 btn btn-custom" type="button">DEMO 3</button>
                    </div>
                </div>

                <div className="collapse show col-12 col-md-9" id="Demo1Div" style={{ padding: '20px', backgroundColor: 'lightgray' }}>
                    <h2 className="text-center">Our Most Popular Phones</h2>
                    <SamsungSlideshow />
                </div>

                <div className="collapse col-12 col-md-9" id="Demo2Div" style={{ padding: '20px', backgroundColor: 'lightgray' }}>
                    <DiscussionBoard />
                </div>

                <div className="collapse col-12 col-md-9" id="Demo3Div" style={{ padding: '20px', backgroundColor: 'lightgray' }}>

                    <h5>PLEASE NOTE:</h5>
                    <h6>This demo combines the 3 following advanced js features:</h6>
                    <h6>Online shop to sell smartphone accessories:</h6>
                    <ul>
                        <li>“search”, “sort”, “filter” by category buttons.</li>
                        <li>“Add to Cart” buttons, and a “Shopping Cart”. </li>
                        <li>Show accessory info, like/dislike, comments, add comment.</li>
                    </ul>
                    <p>These features are available at the top of the screen, or by opening the item's modal by clicking the title or image.</p>



                    <OnlineShop />
                </div>
            </div>
        </>
    );
}

export default AdvancedJS;
