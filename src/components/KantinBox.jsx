import { getFirestore, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { ReactComponent as Box } from '../assets/Box.svg';
import { SolidButton, TransparentButton } from './Buttons';
import { LargeTextField } from './TextField';
import { doc, getDoc } from 'firebase/firestore';
import { TambahUangModal, AmbilUangModal } from './KotakModals';
import { useLocation } from 'react-router-dom';

const KantinBox = () => {
    const [boxAmount, setBoxAmount] = useState('-');
    const [addMoneyModalOpen, setAddMoneyModalOpen] = useState(false);
    const [takeMoneyModalOpen, setTakeMoneyModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        (async () => {
            const docSnapshot = await getDoc(
                doc(getFirestore(), 'moneybox', 'box')
            );

            setBoxAmount(docSnapshot.data().amount);
            console.log();
        })();
    }, [location]);

    useEffect(() => {
        (async () => {
            if (boxAmount !== '-') {
                await setDoc(doc(getFirestore(), 'moneybox', 'box'), {
                    amount: boxAmount,
                });
            }
        })();
    }, [boxAmount]);

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(money);
    };

    const closeModal = () => {
        setAddMoneyModalOpen(false);
        setTakeMoneyModalOpen(false);
    };

    return (
        <div className='flex flex-col items-center gap-[100px] lg:flex-row'>
            {addMoneyModalOpen && (
                <TambahUangModal
                    closeModal={closeModal}
                    setAmount={(amt) => {
                        setBoxAmount(amt);
                    }}
                />
            )}
            {takeMoneyModalOpen && (
                <AmbilUangModal
                    closeModal={closeModal}
                    setAmount={(amt) => {
                        setBoxAmount(amt);
                    }}
                />
            )}
            <Box className='max-w-1/4' />
            <div className='flex flex-col items-center lg:items-start'>
                <h1 className='font-bold mb-3 text-3xl lg:text-5xl'>
                    Isi Kotak Sekarang
                </h1>
                <LargeTextField
                    isDisabled={true}
                    defaultValue={
                        boxAmount === '-'
                            ? ''
                            : formatRupiah(boxAmount).slice(3)
                    }
                />
                <SolidButton
                    onClick={() => {
                        setAddMoneyModalOpen(true);
                    }}
                    className={'w-[300px] lg:w-[440px] mt-8'}
                >
                    Tambah Isi Kotak
                </SolidButton>
                <TransparentButton
                    onClick={() => {
                        setTakeMoneyModalOpen(true);
                    }}
                    className={'mt-4 mb-8'}
                >
                    Ambil Uang dari Kotak
                </TransparentButton>
            </div>
        </div>
    );
};

export default KantinBox;
