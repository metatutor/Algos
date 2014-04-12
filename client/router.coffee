Router.map ->
  @route 'home',{
    path: '/'
  }
  @route 'test',{
    path: '/test'
    template: 'test'
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
