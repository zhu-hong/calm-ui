import { memo, useState } from 'react'
import { ThemeProvider } from '@calm-ui/theme'
import { Button, IconButton } from '@calm-ui/button'
import { Dialog, DialogAutoFocus, DialogClose, Drawer, DrawerClose } from '@calm-ui/modal'
import { Popover, PopoverClose } from '@calm-ui/popover'
import { Tooltip } from '@calm-ui/tooltip'
import { Pagination } from '@calm-ui/pagination'
import { Input, Textarea } from '@calm-ui/input'
import { Switch } from '@calm-ui/switch'
import { Checkbox } from '@calm-ui/checkbox'
import { Radio, RadioGroup } from '@calm-ui/radio-group'
import { Select } from '@calm-ui/select'

const Log = memo(() => {
  console.log('log')
  return '不随抽屉关闭而销毁的子组件'
})

const COLORS = ['#058373','#0B58D2','#fb7185']

const App = () => {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [perPage, setPerPage] = useState(20)
  const [page, setPage] = useState(1)
  const [switchChecked, setSwitchChecked] = useState(true)
  const [switchDisabled, setSwitchDisabled] = useState(true)
  const [checkboxChecked, setCheckboxChecked] = useState<boolean|'indeterminate'>('indeterminate')
  const [primaryColor, setPrimaryColor] = useState(COLORS[1])
  const [selectValue, setSelectValue] = useState('及时的回复客户送快递卡绝世独立卡')

  return <div>
    <div className='w-full overflow-hidden relative'>
      <ThemeProvider value={{
        palette: {
          primary: primaryColor,
        },
      }}>
        <div className="p-32px">
          <p>主题色</p>
          <div className="flex gap-8px mt-8px">
            {
              COLORS.map((c) => <Button theme={c} key={c} onClick={() => setPrimaryColor(c)} outlined={primaryColor!==c}>{c}</Button>)
            }
          </div>
        </div>
        <div className="p-32px">
          <form onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.target as HTMLFormElement)
            console.log({
              input: fd.get('input'),
              textarea: fd.get('textarea'),
              switch: fd.get('switch'),
              checkbox: fd.get('checkbox'),
              radio: fd.get('radio'),
              select: fd.get('select'),
            })
          }}>
            <div>
              <label htmlFor='input'>Input：</label>
              <Input name='input' inputId='input' placeholder='请输入' className='w-320px' />
            </div>
            <div className="flex mt-32px items-center">
              <label htmlFor='textarea' className='self-start'>Textarea：</label>
              <Textarea name='textarea' inputId='textarea' autoFocus className='w-320px' onValueChange={console.log} textareaAttrs={{rows:8,maxLength:5}} placeholder={`1
2
3
4
5`} />
            </div>
            <p>switch</p>
            <Switch checked={switchChecked} name='switch' value='switch' onCheckedChange={setSwitchChecked} disabled={switchDisabled} />
            <br />
            <Switch id='ds' checked={switchDisabled} onCheckedChange={setSwitchDisabled} />
            <label htmlFor="ds">disable</label>
            <br />
            <br />
            <p>checkbox</p>
            <div className="flex items-center">
              <Checkbox name='checkbox' value='checkbox' checked={checkboxChecked} onCheckedChange={(state) => {
                setCheckboxChecked(state)
              }} id='checkbox' />
              <label htmlFor="checkbox">checkbox</label>
            </div>
            <br />
            <br />
            <p>radio group</p>
            <RadioGroup defaultValue='kale3' name='radio'>
              <div className='flex items-center'>
                <Radio value='kale' id='kale' />
                <label htmlFor="kale">kale</label>
              </div>
              <div className='flex items-center'>
                <Radio value='kale2' id='kale2' />
                <label htmlFor="kale2">kale2</label>
              </div>
              <div className='flex items-center'>
                <Radio value='kale3' id='kale3' disabled />
                <label htmlFor="kale3">kale3</label>
              </div>
              <div className='flex items-center'>
                <Radio value='kale4' id='kale4' />
                <label htmlFor="kale4">kale4</label>
              </div>
            </RadioGroup>
            <br />
            <div className="flex items-center">
              <label htmlFor='select'>Select：</label>
              <Select inputId='select' placeholder='请选择' value={selectValue} onValueChange={setSelectValue} name='select' options={[
                {
                  value: 'kale',
                  name: '卡了',
                },
                {
                  value: 'kale2',
                  name: '卡了2',
                },
                {
                  value: 'kale3',
                  name: '卡了3',
                },
                {
                  value: 'kale4',
                  name: '卡了4',
                },
              ]} />
            </div>
            <br />
            <Button type='submit'>SUBMIT</Button>
          </form>
        </div>
        <div className="p-32px">
          <div className='flex items-center gap-12px flex-wrap relative'>
            <p>normal button</p>
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
            <Button theme='danger' onClick={() => setOpen(true)}>Dialog</Button>
            <Button theme='success' onClick={() => setOpen2(true)}>Drawer KeepMount</Button>
            <Button theme='warning'>GO</Button>
            <Button theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
            <p>outlined button</p>
            <Button outlined theme='primary' className='text-32px fontmono'>GO</Button>
            <Button outlined theme='danger' className='bg-white'>GO</Button>
            <Popover
              triggerType='hover'
              content={
                <div className='p-64px rounded border bg-white'>
                  <p>1231234512345</p>
                  <Input placeholder='请输入' />
                  <PopoverClose>close</PopoverClose>
                </div>
              }
              placement='bottom-end'
            >
              <Button outlined theme='success'>Popover</Button>
            </Popover>
            <Button outlined theme='warning' loading>LOADING BUTTON</Button>
            <Button outlined theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
            <p>text button</p>
            <Tooltip enterable content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis ab at earum voluptates dolore rem provident, perferendis, fugit rerum quaerat laudantium quis maxime beatae quibusdam excepturi iste? Iure, nisi?' placement='top-start'>
              <Button text theme='primary' className='max-w-120px'><span className='truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis ab at earum voluptates dolore rem provident, perferendis, fugit rerum quaerat laudantium quis maxime beatae quibusdam excepturi iste? Iure, nisi?</span></Button>
            </Tooltip>
            <Tooltip content='tooltip' placement='bottom' delay={0}>
              <Button text theme='danger'>Tooltip</Button>
            </Tooltip>
            <Button text theme='success'>GO</Button>
            <Button text theme='warning'>GO</Button>
            <Button text theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
            <p>tag button</p>
            <Button tag theme='primary'>GO</Button>
            <Button tag theme='danger'>GO</Button>
            <Button tag theme='success'>GO</Button>
            <Button tag theme='warning'>GO</Button>
            <Button tag theme='default'>GO</Button>
          </div>
          <div className='mt-32px flex items-center gap-12px flex-wrap'>
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
        <div className='p-32px'>
          <Pagination perPage={perPage} onPerPageChange={setPerPage} total={1000} page={page} onPageChange={setPage} />
        </div>
      </ThemeProvider>
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
          <Button theme='default' outlined>自关闭</Button>
        </DialogClose>
        <p>安全的autoFocus</p>
        <DialogAutoFocus>
          <Textarea rows={5} placeholder={`1
2
3
4
5`} className='w-520px' />
        </DialogAutoFocus>
      </div>
    </Dialog>
  </div>
}

export default App
