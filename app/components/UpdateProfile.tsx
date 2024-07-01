'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import closeIcon from '../assets/close.svg';
import UpdateForm from './forms/UpdateForm';
import { typeUser } from '../../types/types';

type Props = {
  user: typeUser;
}

const UpdateProfile = (props: Props) => {
  const { user } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef(null);
  
  // To manage the Modal form
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button className='button' onClick={openModal}>
        Modifier mon profil
      </button>
      {showModal && (
        <div className='modal' ref={modalRef}>
          <AnimatePresence>
            <motion.div
              className='modal-container'
              initial={{ opacity: 0, scale: 0, rotate: '15deg' }}
              animate={{ opacity: 1, scale: 1, rotate: '0deg' }}
              exit={{ opacity: 0, scale: 0, rotate: '45deg' }}
              transition={{ duration: 0.5 }}
            >
              <Image className='modal-button' src={closeIcon} alt='Fermer la fenêtre de modification du profil' onClick={closeModal} />
              <h4 className='shy-title'>Update profil</h4>
              <UpdateForm user={user} setShowModal={setShowModal} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;

