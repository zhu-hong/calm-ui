import { memo, useEffect, useRef, useState } from 'react'
import { ThemeProvider } from '@calm-ui/theme'
import { Button, IconButton } from '@calm-ui/button'
import { Dialog, DialogAutoFocus, DialogClose, Drawer, DrawerClose } from '@calm-ui/modal'
import { Popover, PopoverClose } from '@calm-ui/popover'
import { Tooltip } from '@calm-ui/tooltip'
import { Pagination } from '@calm-ui/pagination'

const Log = memo(() => {
  console.log('log')
  return 'log'
})

const App = () => {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const ref = useRef(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [perPage, setPerPage] = useState(20)
  const [page, setPage] = useState(1)
  useEffect(() => {
    console.log(ref)
    // btnRef.current?.scrollIntoView({
    //   block: 'center',
    //   inline: 'center',
    // })
  }, [])
  return <div>
    <div className="h-screen"></div>
    <div className='p-32px w-full overflow-hidden h-520px relative' ref={ref}>
      <ThemeProvider value={{
        palette: {
          primary: '#fb7185',
          danger: '#dc2626',
          success: '#34d399',
          warning: '#e879f9',
        },
      }}>
        <div className='flex items-center gap-12px flex-wrap relative'>
          <Button theme='primary' className='font-500 text-32px'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
              <g fill="none">
                <path fill="#86d72f" d="M29.84 15.92C29.84 23.61 18.92 30 15.92 30S2 23.61 2 15.92S8.23 2 15.92 2s13.92 6.23 13.92 13.92"></path>
                <path fill="#212121" d="M13.368 24.225a1 1 0 0 1 1.407.143c.376.461.825.645 1.225.645s.85-.184 1.225-.645a1 1 0 1 1 1.55 1.264c-.724.889-1.726 1.38-2.775 1.38c-1.05 0-2.05-.491-2.775-1.38a1 1 0 0 1 .143-1.407"></path>
                <path fill="#533566" d="M6.474 19.527c2.254 2.253 4.6 3.549 6.845 1.306c2.253-2.242 2.233-5.905-.01-8.147c-2.244-2.243-5.898-2.253-8.142 0s-.946 4.588 1.307 6.84m19.051.001c-2.255 2.253-4.602 3.549-6.847 1.306s-2.234-5.905.01-8.147c2.245-2.243 5.9-2.253 8.144 0c2.245 2.253.947 4.588-1.307 6.84"></path>
                <path fill="#fff" d="M12.62 15.62c.61-.61.47-1.73-.31-2.51c-.78-.77-1.9-.92-2.51-.31s-.47 1.73.31 2.51s1.9.92 2.51.31m13.28 0c.61-.61.47-1.73-.31-2.51c-.77-.77-1.9-.92-2.51-.31s-.47 1.73.31 2.51s1.9.92 2.51.31"></path>
              </g>
            </svg>
            Primary
          </Button>
          <Button theme='danger' autoFocus onClick={() => setOpen(true)}>Dialog</Button>
          <Button theme='success' onClick={() => setOpen2(true)}>Drawer KeepMount</Button>
          <Button theme='warning' loading>Loading Button</Button>
          <Button theme='default'>GO</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>outlined button</p>
          <Button outlined theme='primary' className='text-32px fontmono'>GO</Button>
          <Button outlined theme='danger' className='bg-white'>GO</Button>
          <Popover
            content={
              <div className='p-64px rounded border bg-white'>
                <p>1231234512345</p>
                <input type="text" />
                <PopoverClose>close</PopoverClose>
              </div>
            }
            placement='bottom-end'
          >
            <Button ref={btnRef} outlined theme='success'>Popover</Button>
          </Popover>
          <Button outlined theme='warning'>GO</Button>
          <Button outlined theme='default'>GO</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>text button</p>
          <Tooltip content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis ab at earum voluptates dolore rem provident, perferendis, fugit rerum quaerat laudantium quis maxime beatae quibusdam excepturi iste? Iure, nisi?' placement='top-start'>
            <Button text theme='primary' className='max-w-120px'><span className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis ab at earum voluptates dolore rem provident, perferendis, fugit rerum quaerat laudantium quis maxime beatae quibusdam excepturi iste? Iure, nisi?</span></Button>
          </Tooltip>
          <Tooltip content='tooltip' placement='top'>
            <p tabIndex={0}>tooltop</p>
          </Tooltip>
          <Button text theme='danger'>GO</Button>
          <Button text theme='success'>GO</Button>
          <Button text theme='warning'>GO</Button>
          <Button text theme='default'>GO</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>tag button</p>
          <Button tag theme='primary' className='px-14px! py-2px! text-sm'>GO</Button>
          <Button tag theme='danger' className='px-14px! py-2px! text-sm'>GO</Button>
          <Button tag theme='success' className='px-14px! py-2px! text-sm'>GO</Button>
          <Button tag theme='warning' className='px-14px! py-2px! text-sm'>GO</Button>
          <Button tag theme='default' className='px-14px! py-2px! text-sm'>GO</Button>
          <Button tag theme='#0b58d2' className='px-14px! py-2px! text-sm'>GO</Button>
        </div>
      </ThemeProvider>
      <div className='mt-32px flex items-center gap-12px'>
        <p>icon button</p>
        <IconButton theme='primary'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
          </svg>
        </IconButton>
        <IconButton theme='danger'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
          </svg>
        </IconButton>
        <IconButton theme='success'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
          </svg>
        </IconButton>
        <IconButton theme='warning'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
          </svg>
        </IconButton>
        <IconButton theme='default'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"></path>
          </svg>
        </IconButton>
      </div>
    </div>
    <div className="h-screen"></div>
    <div className='p-32px'>
      <Pagination perPage={perPage} onPerPageChange={setPerPage} total={1000} page={page} onPageChange={setPage} />
    </div>
    <Drawer open={open2} onOpenChange={setOpen2} zIndex={1000} keepMount overlay={false}>
      <div style={{width:320,height:100,backgroundColor:'black'}}></div>
      <DrawerClose />
      <Log />
    </Drawer>
    <Dialog open={open} onOpenChange={setOpen}>
      <div style={{padding:32}}>
        <DialogClose />
        <DialogClose asChild>
          <Button theme='default' outlined>取消</Button>
        </DialogClose>
        <p>正常autoFocus</p>
        <DialogAutoFocus>
          <input type="text" />
        </DialogAutoFocus>
      </div>
    </Dialog>
  </div>
}

export default App
