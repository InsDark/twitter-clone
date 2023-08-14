import Modal from 'react-modal'
import TweetMaker from './Tweets/TweetMaker';
import { modalStore } from '../state/modal';

const customStyles = {
    overlay: {
        backgroundColor: "rgb(36, 45, 52, 0.7)",
        
    },
    content: {
        top: '10%',
        bottom: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: '1rem',
        border: 'none',
        minWidth: '30rem', 
        maxWidth: '40rem',
        padding: '0 1rem',
        backgroundColor: "#000000" ,
    },


};

const ModalComponent = ({ isOpen, contentElement }) => {
    Modal.setAppElement('#root')
    const  {setIsOpen} = modalStore(state => state)
    return (
        <Modal
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={(e) => {setIsOpen(false)}}
        >
            <button onClick={() => setIsOpen(false)} className='text-gray-400 p-3 hover:text-white '>X</button>
            {contentElement}
        </Modal>
    )
}


export default ModalComponent