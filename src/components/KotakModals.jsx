import ModalWrapper from './ModalWrapper';
import { SolidButton, TransparentButton } from './Buttons';
import { ReactComponent as Close } from '../assets/Close.svg';
import { useState } from 'react';
import { doc, getFirestore, getDoc } from 'firebase/firestore';

const TambahUangModal = ({ closeModal, setAmount }) => {
    const [value, setValue] = useState();

    const tambahUang = async () => {
        const docSnapshot = await getDoc(
            doc(getFirestore(), 'moneybox', 'box')
        );

        setAmount(docSnapshot.data().amount + parseInt(value, 10));
        closeModal();
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <ModalWrapper>
            <div className='pt-16 pb-10 px-10 max-w-[95%] relative bg-white flex flex-col items-center rounded-2xl'>
                <button onClick={closeModal}>
                    <Close className='absolute top-2 right-3' />
                </button>
                <LargeTextField onChange={onChange} value={value} />
                <SolidButton onClick={tambahUang} className={'mt-5 mb-3'}>
                    Tambah Isi Kotak
                </SolidButton>
                <TransparentButton onClick={closeModal}>
                    Batal
                </TransparentButton>
            </div>
        </ModalWrapper>
    );
};

const AmbilUangModal = ({ closeModal, setAmount }) => {
    const [value, setValue] = useState();
    const [showWarning, setShowWarning] = useState(false);

    const ambilUang = async () => {
        const docSnapshot = await getDoc(
            doc(getFirestore(), 'moneybox', 'box')
        );

        if (docSnapshot.data().amount - parseInt(value, 10) >= 0) {
            setAmount(docSnapshot.data().amount - parseInt(value, 10));
            closeModal();
        } else {
            setShowWarning(true);
        }
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <ModalWrapper>
            <div className='pt-16 pb-10 px-10 relative bg-white flex flex-col items-center rounded-2xl'>
                <button onClick={closeModal}>
                    <Close className='absolute top-2 right-3' />
                </button>
                <LargeTextField onChange={onChange} value={value} />
                <SolidButton onClick={ambilUang} className={'mt-5 mb-3'}>
                    Ambil Isi Kotak
                </SolidButton>
                <TransparentButton onClick={closeModal}>
                    Batal
                </TransparentButton>
            </div>
            {showWarning && (
                <div className='fixed bg-white px-4 py-3 bottom-5 rounded-2xl'>
                    <h3 className='font-bold'>Isi Kotak Tidak Mencukupi</h3>
                </div>
            )}
        </ModalWrapper>
    );
};

const LargeTextField = ({ onChange, value }) => {
    return (
        <div className='w-[300px] lg:w-[530px] px-3 py-1 lg:px-5 lg:py-3 rounded-[10px] bg-KJJGray flex justify-between items-center font-bold'>
            <h1 className='text-2xl lg:text-5xl'>Rp</h1>
            <input
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
                autoFocus
                onChange={onChange}
                className='font-default select-none text-3xl lg:text-5xl leading-[72px] bg-inherit w-[230px] lg:w-[410px] text-right focus:outline-0'
                value={value}
            />
        </div>
    );
};

export { TambahUangModal, AmbilUangModal };
