<% if $Events %>
<div id="time-line-holder">
    <div class="container">
        <div class="row">
            <div id="timeline" class="col-md-12">
                <ul id="dates">
                    <% loop $Events %>
                        <li>
                            <a href="#$Year">$Year</a>
                        </li>
                    <% end_loop %>
                </ul>
                <ul id="issues">
                    <% loop $Events %>
                        <li id="$Year">
                            <div>
                                <div class="image">
                                    <% if $Image %>
                                        <img src="$Image.Url" />
                                    <% end_if %>
                                </div>
                                <div class="copy">
                                    $Content
                                </div>
                            </div>
                        </li>
                    <% end_loop %>
                </ul>
                <div id="grad_left"></div>
                <div id="grad_right"></div>
                <a href="#" id="next">+</a>
                <a href="#" id="prev">-</a>
            </div>
        </div>
    </div>
</div>
<% end_if %>