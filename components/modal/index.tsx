import Modal from 'react-modal'
import { HiXCircle } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@redux/store'
import { toggleModal } from '@redux/slice/dashboard'
import RequestModal from './RequestModal'
import PaymentModal from './PaymentModal'
import ReceiptModal from './ReceiptModal'

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none',
    padding: 0,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '90',
  },
}

const DashboardModal = () => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector((state) => state.dashboard)
  const onRequestClose = () => {
    if (modal.type_ === 'payment' || modal.type_ === 'request') {
      const yes = confirm('Do you really want to close the Modal?')
      if (!yes) return
    }
    dispatch(toggleModal({ open: false, type_: 'none' }))
  }

  const selectModal = () => {
    switch (modal.type_) {
      case 'request':
        return <RequestModal />
      case 'payment':
        return <PaymentModal />
      case 'receipt':
        return <ReceiptModal />
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modal.open}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className="relative flex h-[80vh] max-h-[450px] w-[95vw] max-w-[350px] flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-b  from-primary/50 to-slate-900/60 text-primary shadow-lg backdrop-blur-[4px] sm:max-w-[380px] lg:max-h-[650px] lg:max-w-[480px] lg:space-y-2">
        <div className="fixed right-0 top-0 left-0 z-[9] flex h-12 w-full items-center justify-between bg-white px-3 lg:h-16">
          <span className="text-lg lg:text-2xl">Cake Request Form</span>
          <HiXCircle
            className="cursor-pointer text-2xl text-red-700 lg:text-4xl"
            onClick={onRequestClose}
          />
        </div>
        <div className="mx-auto !mb-5 mt-14 h-full w-[90%] overflow-y-scroll rounded-lg bg-white-x100/70 p-5 text-white-x200 shadow-lg backdrop-blur-sm scrollbar-none lg:!mt-20">
          {selectModal()}
        </div>
      </div>
    </Modal>
  )
}

export default DashboardModal
