"use client";
import { Provider } from '@supabase/supabase-js';
import { oAuthSignIn } from './action';

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const OAuhtProviders: OAuthProvider[] = [
    {
      name: 'github',
      displayName: 'Github',
      // icon : 'place du logo'
    },
  ];

  return (
    <>
      {OAuhtProviders.map((provider, index) => (
        <button onClick={async () => {
          await oAuthSignIn(provider.name);
        }} key={index}>Login with {provider.displayName}</button>
      ))}
    </>
  );
}

