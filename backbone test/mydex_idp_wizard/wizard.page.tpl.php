    <!-- Need to add the templates before loading backbone or it doesn't know they exist  -->

    <script type="text/template" id="connection-item-template">
        <div class="toggle <%= completed ? 'connected' : '' %>">
            <% if (completed) { %>
              <i class="icon-li icon-ok"></i>
            <% } %>
            <a href="#">
              <%- title %>
            </a>
        </div>
    </script>

    <script type="text/template" id="activity-pane-template">

    <div class="connection-prompt">

    <h2>Choose an organisation you have an existing relationship with to collect your data.</h2>
    <h2>You will then use this data as proof of identity when creating your government ID.</h2>

    </div>

    </script>



<div class="content clearfix">

<div class="connection-wizard">

    <div id="wizard-steps"></div>

    <div class='intro'></div>

    <div class='step1'>

        <!-- add progress indicator for tracking data
        used for government ID -->
        <div class="progress-indicator"></div>


        <!-- list of connections -->
        <ul id="connection-list"></ul>

        <!-- activity template -->
        <div class="activity-pane"></div>

    </div>

    <div class='step2'></div>

    <div class='step3'></div>
  </div>

</div>