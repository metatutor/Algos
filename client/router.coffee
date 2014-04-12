Router.map ->
  @route 'home',{
    path: '/'
  }
  @route 'agency',{
    path: '/agency/dashboard'
    template: 'agency'
  }
  @route 'rider',{
    path: '/rider/mobile-display'
    template: 'rider'
  }

Router.configure {
  layoutTemplate: 'layout_main'
}
