---
to: packages/<%=package%>/src/state/index.js
inject: true
after: 'import { routerReducer }'
---
import <%=storyCardName%> from "./<%=slug%>";