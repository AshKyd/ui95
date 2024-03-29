import { h } from "preact";
import Reader from ".";

export default {
  title: "App/Reader",
};

export const WithContent = () => (
  <Reader
    content={`
<header class="entry-header">
    <h1 class="entry-title">
        <a href="#" rel="permalink">Vue &amp; React lifecycle method comparison</a>
    </h1>
    
    <div class="entry-meta">
        <span class="sep">Posted </span>

        <a href="https://ash.ms/2019-02-19/vue-react-lifecycle-method-comparison/" rel="bookmark">
            <time class="entry-date" datetime="2019-02-19T21:07:57.426Z" itemprop="datePublished">2019-02-19</time>
        </a>
    </div>
    
</header>      
      
<div class="article-entry entry-content" itemprop="articleBody">

<p><a href="/foo">Example internal link</a></p>
<p>This was going to be a longer post but I thought this was interesting enough to post now.</p>
<p><a href="https://reactjs.org/docs/react-component.html#the-component-lifecycle">React</a> and <a href="https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram">Vue</a> both have fairly well defined lifecycle events which we can use to successfully navigate the mysteries of the virtual DOM.</p>
<p>So without further ado, let’s get down to the React vs Vue lifecycle events smackdown!</p>
<p><img src="https://ash.ms/wp-content/vuevsreact.jpg" alt="Vue and React fighting in an animated fashion. A caption reads &quot;Bam!&quot;"></p>
<hr>
<h2 id="Vue-lifecycle-events-visualised"><a href="#Vue-lifecycle-events-visualised" class="headerlink" title="Vue lifecycle events visualised"></a>Vue lifecycle events visualised</h2><p>The following demo logs out the Vue lifecycle events when a component mounts and updates.</p>
<p>It’s actually a fairly nice API in that everything is consistently named, even if not all of the events are strictly useful.</p>
<p><iframe src="https://codepen.io/AshKyd/embed/exxadm/?height=265&amp;theme-id=light&amp;default-tab=result" width="100%" height="300"></iframe></p>
<h2 id="React-lifecycle-events-visualised"><a href="#React-lifecycle-events-visualised" class="headerlink" title="React lifecycle events visualised"></a>React lifecycle events visualised</h2><p>React is actually the more esoteric of the two in terms of naming, but actually offers more powerful functionality (such as my particular favourite, <code>shouldComponentUpdate</code>).</p>
<p><iframe src="https://codepen.io/AshKyd/embed/BMbZgK/?height=265&amp;theme-id=light&amp;default-tab=result" width="100%" height="300"></iframe></p>
<hr>
<h2 id="Component-mount-compared"><a href="#Component-mount-compared" class="headerlink" title="Component mount compared"></a>Component mount compared</h2><p>The basic workflow for a component is pre-mount → render → mount.</p>
<p>Vue has more events, whereas React is more Javascripty with an actual ES constructor.</p>
<table>
<thead>
<tr>
<th>React</th>
<th>Vue</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>constructor</td>
<td>beforeCreate</td>
<td>Roughly synonymous with each other. The constructor sets up the React class, whereas Vue handles the class creation for you.</td>
</tr>
<tr>
<td>-</td>
<td>data</td>
<td>Set data. Vue recursively converts these properties into getter/setters to make them “reactive”.</td>
</tr>
<tr>
<td>-</td>
<td>created</td>
<td>Data observation, computed properties, methods, watch/event callbacks have been set up.</td>
</tr>
<tr>
<td>-</td>
<td>beforeMount</td>
<td>Right before the mounting begins: the render function is about to be called for the first time.</td>
</tr>
<tr>
<td>getDerivedStateFromProps</td>
<td>-</td>
<td>Invoked right before calling the render method. It should return an object to update the state, or null to update nothing.</td>
</tr>
<tr>
<td>render</td>
<td>render</td>
<td>The virtual DOM is rendered and inserted into the actual DOM.</td>
</tr>
<tr>
<td>componentDidMount</td>
<td>mounted</td>
<td>The component is now mounted. We can make any direct DOM manipulations at this point.</td>
</tr>
</tbody>
</table>
<p>We can see from our lifecycle that the perfect time to hook into the process is once the component has been mounted (in React’s <code>componentDidMount</code> or Vue’s <code>mounted</code> event).</p>
<hr>
<h2 id="Component-update-compared"><a href="#Component-update-compared" class="headerlink" title="Component update compared"></a>Component update compared</h2><p>Component update generally follows a pre-update → render → updated workflow. Easy!</p>
<table>
<thead>
<tr>
<th>React</th>
<th>Vue</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>getDerivedStateFromProps</td>
<td>-</td>
<td>Same as when mounting.</td>
</tr>
<tr>
<td>shouldComponentUpdate</td>
<td>-</td>
<td>Let React know if a component’s output is not affected by the current change in state or props. We can use this to prevent React blowing away our changes.</td>
</tr>
<tr>
<td>-</td>
<td>beforeUpdate</td>
<td>Called when data changes, before the DOM is patched.</td>
</tr>
<tr>
<td>render</td>
<td>render</td>
<td>The virtual DOM is rendered and patched into the actual DOM.</td>
</tr>
<tr>
<td>getSnapshotBeforeUpdate</td>
<td>-</td>
<td>Right before the most recently rendered output is committed to the DOM. Lets you save the previous state of the DOM for use after the component has updated.</td>
</tr>
<tr>
<td>componentDidUpdate</td>
<td>updated</td>
<td>After the DOM has been updated</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="Component-unmount-compared"><a href="#Component-unmount-compared" class="headerlink" title="Component unmount compared"></a>Component unmount compared</h2><p>When your component is removed from the page, sometimes you need to remove event handlers or clean up after any manual DOM manipulation.</p>
<table>
<thead>
<tr>
<th>React</th>
<th>Vue</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>-</td>
<td>deactivated</td>
<td>When using <a href="https://vuejs.org/v2/api/#keep-alive">Vue keep-alive</a>, the component is removed from the page but not destroyed so that we can load it again later without the overhead of component mount.</td>
</tr>
<tr>
<td>-</td>
<td>activated</td>
<td>The previously deactivated component is reactivated.</td>
</tr>
<tr>
<td>componentWillUnmount</td>
<td>beforeDestroy</td>
<td>When a component is being removed from the DOM</td>
</tr>
<tr>
<td>-</td>
<td>destroyed</td>
<td>The component is completely gone.</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="Handling-errors"><a href="#Handling-errors" class="headerlink" title="Handling errors"></a>Handling errors</h2><p>This is something I’ve not looked too much into, but it’s possible to catch errors from child components and change the render accordingly.</p>
<p>This would be most useful for a top-level component (above the routes, maybe) to show an “Aw Snap” error message into your app and stop the error bubbling up.</p>
<table>
<thead>
<tr>
<th>React</th>
<th>Vue</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>componentDidCatch<br>getDerivedStateFromError</td>
<td>errorCaptured</td>
<td>An error occurred in a child component.</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="Conclusion"><a href="#Conclusion" class="headerlink" title="Conclusion"></a>Conclusion</h2><p>Each has their own benefits, neither is objectively better or worse. Personally I prefer the Vue naming, but prefer the power of the React API.</p>
<p>After pulling this info together I’m really interested to try out Vue’s keep-alive for render-intensive jobs. It’s a cool feature I didn’t know existed.</p>
<p>I’m also excited to play with component-level error handling, especially for larger apps. It makes a lot of sense to catch errors in the framework rather than waiting for them to bubble up to the global error handler 😅</p>
<p>Anyway, hope this was helpful. I learned something.</p>

  
</div>`}
  />
);

WithContent.story = {
  name: "With content",
};
