
<form role="form" class="google-adsense-settings form-horizontal">
	<div class="row">
		<div class="col-sm-12 col-md-8">
			<h1>Google Adsense</h1>
			<p>
				Detailed readme can be found on <a href="https://github.com/NodeBB-Community/nodebb-plugin-adsense" target="_blank">GitHub</a>
			</p>
			<div class="form-group">
				<label for="client_id">Publisher ID (<a href="https://support.google.com/adsense/answer/105516?hl=en" target="_blank" title="More information">?</a>)</label>
				<input type="text" class="form-control" id="client_id" name="client_id" placeholder="pub-xxxxxxxxxxxxxxxx">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">Disable Ads For Groups</div>
		<div class="col-sm-10 col-xs-12">
			<div class="form-group">
				<label for="adFreeGroups">Select the groups that will not see ads</label>
				<select class="form-control" id="adFreeGroups" name="adFreeGroups" multiple>
					<!-- BEGIN groups -->
					<option value="{../name}">{../value}</option>
					<!-- END groups -->
				</select>
			</div>
		</div>
	</div>

	<button type="submit" class="btn btn-primary" id="save">Submit</button>
</form>
