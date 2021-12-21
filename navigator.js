import { createAppContainer }  	 from 'react-navigation';
import { createStackNavigator }	 from 'react-navigation-stack';

import LoginScreen           	 from './screens/Login';
import Landing                   from './screens/Landing';
import Question                  from './screens/Question';

const MainNavigator = createStackNavigator(
	{
		Login            	: { screen: LoginScreen },
		Landing           	: { screen: Landing },
		Question            : { screen: Question },
	},
	{
		initialRouteName    : 'Landing',
	},
);

const AppNavigation = createAppContainer(MainNavigator);

export default createAppContainer(MainNavigator);

