/**
 * Created by Donghui Huo on 2016/5/11.
 */
export  {default as dashBoard}   from './dashBoard'
export  {default as role}   from './role'
export  {default as user, TableUpdateBlock as userUpdate, TableAddBlock as userAdd,TablePersonalInfoBlock as userPersonalInfo}   from './user'
export  {default as clients, TableUpdateBlock as clientUpdate, TableAddBlock as clientAdd}   from './client'
export  {default as moduleRoles, TableUpdateBlock as moduleRoleUpdate, TableAddBlock as moduleRoleAdd}   from './modulerole'
export  {default as modules, TableUpdateBlock as moduleUpdate, TableAddBlock as moduleAdd}   from './module'
export  {Error404 as error404}   from './error'