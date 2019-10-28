import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import MeetupNew from '~/pages/MeetupNew';
import MeetupShow from '~/pages/MeetupShow';
import MeetupEdit from '~/pages/MeetupEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetups/new" component={MeetupNew} isPrivate />
      <Route path="/meetups/:id" exact component={MeetupShow} isPrivate />
      <Route path="/meetups/:id/edit" exact component={MeetupEdit} isPrivate />

    </Switch>
  );
}
