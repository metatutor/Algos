
Meteor.methods {
  getNextScheduled: (agency, stop, line, direction)->
    check agency,String
    check stop,String
    check line,String
    check direction,String
}
