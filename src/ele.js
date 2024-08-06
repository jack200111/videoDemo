import Vue from 'vue'
import {
	Message,
	MessageBox,
	Form,
	FormItem,
	Input,
	Aside,
	Main,
	Container,
	Menu,
	Button,
	Dialog,
	Table,
	TableColumn,
	Radio,
	RadioGroup,
	Select,
	DatePicker,
	Pagination,
	Switch,
	Option,
	TimelineItem,
	Timeline,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Tag,
	Header,
	Footer,
	CheckboxGroup,
	Checkbox,
	Cascader,
	Breadcrumb,
	BreadcrumbItem,
	Steps,
	Step,
	InputNumber,
	Tabs,
	TabPane,
	Rate,
	Carousel,
	CarouselItem,
	Popover,
	Tooltip,
	CascaderPanel,
	Image,
	Drawer,
	Tree,
	Loading,
} from 'element-ui'

Vue.use(Form)
Vue.use(Popover)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Menu)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Option)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tag)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Cascader)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Steps)
Vue.use(Step)
Vue.use(InputNumber)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Rate)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tooltip)
Vue.use(CascaderPanel)
Vue.use(Image)
Vue.use(Drawer)
Vue.use(Tree)
Vue.use(Loading)

Dialog.props.lockScroll.default = false
Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.$message = function (msg, type) {
	Message({ message: msg, type: type, duration: 2000 })
}