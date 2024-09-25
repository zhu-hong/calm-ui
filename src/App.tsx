import { memo, useState } from 'react'
import { ThemeProvider } from '@calm-ui/theme'
import { Button, IconButton } from '@calm-ui/button'
import { Dialog, DialogAutoFocus, DialogClose, Drawer, DrawerClose } from '@calm-ui/modal'
import { Pagination } from '@calm-ui/pagination'
import { Input, Textarea } from '@calm-ui/input'
import { Switch } from '@calm-ui/switch'
import { Checkbox } from '@calm-ui/checkbox'
import { Radio, RadioGroup } from '@calm-ui/radio-group'
import { Select } from '@calm-ui/select'

const options = [
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
  {
    value: 'kale5',
    name: '卡了5',
  },
  {
    value: 'kale6',
    name: '卡了6',
  },
  {
    value: 'kale7',
    name: '卡了7',
  },
  {
    value: 'kale8',
    name: '卡了8',
  },
  {
    value: 'kale9',
    name: '卡了9',
  },
  {
    value: 'kale10',
    name: '卡了410'
  },
  {
    value: 'kale11',
    name: '卡了211'
  },
  {
    value: 'kale12',
    name: '卡了312'
  },
  {
    value: 'kale13',
    name: '卡了413卡了413卡了413卡了413卡了413卡了413卡了413卡了413卡了413'
  },
]

const Log = memo(() => {
  console.log('log')
  return '不随抽屉关闭而销毁的子组件'
})

const COLORS = ['#058373','#0B58D2','#fb7185']

const App = () => {
  const [primaryColor, setPrimaryColor] = useState(COLORS.at(-1))

  const [checkboxChecked, setCheckboxChecked] = useState<boolean|'indeterminate'>('indeterminate')
  const [selectValue, setSelectValue] = useState('')

  const [perPage, setPerPage] = useState(20)
  const [page, setPage] = useState(1)
  
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  return <>
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
        <div className='flex items-center gap-12px'>
          <p>normal button</p>
          <Button theme='primary' loading>Primary Loading</Button>
          <Button theme='danger' disabled>Danger disabled</Button>
          <Button theme='success'>
            Success
            <svg xmlns="http://www.w3.org/2000/svg" className='ml-8px' width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0"></path></svg>
          </Button>
          <Button theme='warning'>Warning</Button>
          <Button theme='default'>Default</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>outlined button</p>
          <Button outlined theme='primary'>Primary</Button>
          <Button outlined theme='danger'>Danger</Button>
          <Button outlined theme='success'>Success</Button>
          <Button outlined theme='warning'>Warning</Button>
          <Button outlined theme='default'>Default</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>text button</p>
          <Button text theme='primary'>Primary</Button>
          <Button text theme='danger'>Danger</Button>
          <Button text theme='success'>Success</Button>
          <Button text theme='warning'>Warning</Button>
          <Button text theme='default'>Default</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>tag button</p>
          <Button tag theme='primary'>Primary</Button>
          <Button tag theme='danger'>Danger</Button>
          <Button tag theme='success'>Success</Button>
          <Button tag theme='warning'>Warning</Button>
          <Button tag theme='default'>Default</Button>
        </div>
        <div className='mt-32px flex items-center gap-12px'>
          <p>icon button</p>
          <IconButton theme='primary'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='danger'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='success'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='warning'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
          <IconButton theme='default'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.503.503 0 0 0 .755.605c.012-.009 1.262-.902 3.702-.902c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604m-12 0c-.06-.135-1.499-3.297-4.457-3.297s-4.397 3.162-4.457 3.297a.499.499 0 0 0 .754.605C8.31 18.393 9.559 17.5 12 17.5c2.426 0 3.674.881 3.702.901a.498.498 0 0 0 .755-.604M31 16c-.396 0-.772-.238-.929-.629c-1.778-4.445-6.223-5.381-6.268-5.391a1 1 0 1 1 .393-1.961c.226.045 5.556 1.168 7.732 6.608A1 1 0 0 1 31 16M5 16a1 1 0 0 1-.928-1.372c2.176-5.44 7.506-6.563 7.732-6.608a1 1 0 0 1 .396 1.96c-.185.038-4.506.98-6.271 5.391A1 1 0 0 1 5 16m13 6c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#fff" d="M9 23s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#5dadec" d="M10.847 28.229a5 5 0 0 1-9.693-2.461c.679-2.677 6.337-8.708 7.307-8.462s3.065 8.247 2.386 10.923m14.286 0a5 5 0 0 0 6.077 3.615a5 5 0 0 0 3.616-6.076c-.68-2.677-6.338-8.708-7.308-8.462c-.968.247-3.064 8.247-2.385 10.923"></path></svg>
          </IconButton>
        </div>
      </div>
      <div className='flex p-32px'>
        <form className="border p-32px">
          <label htmlFor='input' className='w-6rem text-right'>Input：</label>
          <Input name='input' id='input' value={'sdsdsdsd'} disabled />
          <br />
          <label htmlFor='textarea' className='w-6rem text-right'>Textarea：</label>
          <Textarea name='textarea' id='textarea' value={'sdsdsdsd'} disabled />
          <br />
          <label htmlFor='switch'>switch</label>
          <br />
          <Switch name='switch' id='switch' value='switch' />
          <br />
          <br />
          <label htmlFor="checkbox">checkbox</label>
          <br />
          <Checkbox name='checkbox' id='checkbox' value='checkbox' checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
          <br />
          <br />
          <p>radio group</p>
          <RadioGroup name='radio' className='flex items-center'>
            <Radio id='kale1' value='kale' />
            <label htmlFor="kale1">卡了1</label>
            <Radio id='kale2' value='kale2' />
            <label htmlFor="kale2">卡了2</label>
            <Radio id='kale3' value='kale3' />
            <label htmlFor="kale3">卡了3</label>
            <Radio id='kale4' value='kale4' />
            <label htmlFor="kale4">卡了4</label>
          </RadioGroup>
          <br />
          <label htmlFor='select'>Select：</label>
          <Select name='select' id='select' value={selectValue} onValueChange={setSelectValue} options={options} inputAttrs={{
            onChange: console.log,
          }}  />
          <br />
          <br />
          <Button type='submit'>SUBMIT</Button>
        </form>
      </div>
      <div className='p-32px'>
        <p>pagination</p>
        <br />
        <Pagination perPage={perPage} onPerPageChange={setPerPage} total={1000} page={page} onPageChange={setPage} />
      </div>
    </ThemeProvider>
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
  </>
}

export default App
