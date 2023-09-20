<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 col-md-8 px-0 mb-4" tabindex="0">
			<form role="form" class="google-adsense-settings">
				<div class="mb-3">
					<p class="form-text">
						Detailed readme can be found on <a href="https://github.com/NodeBB-Community/nodebb-plugin-adsense" target="_blank">GitHub</a>
					</p>
					<div class="mb-3">
						<label class="form-label" for="client_id">Publisher ID (<a href="https://support.google.com/adsense/answer/105516?hl=en" target="_blank" title="More information">?</a>)</label>
						<input type="text" class="form-control" id="client_id" name="client_id" placeholder="pub-xxxxxxxxxxxxxxxx">
					</div>
					<div>
						<label class="form-label" for="adstxt">Ads.txt (<a href="https://support.google.com/adsense/answer/12171612?hl=en" target="_blank" title="More information">?</a>)</label>
						<textarea class="form-control" id="adstxt" name="adstxt" placeholder="google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, xxxxxxxxxxxxxxxx"></textarea>
					</div>
				</div>
				<div class="mb-3">
					<div class="">
						<label class="form-label" for="adFreeGroups">Select the groups that will not see ads</label>
						<select class="form-select" id="adFreeGroups" name="adFreeGroups" multiple size="10">
							{{{ each groups}}}
							<option value="{./name}">{./value}</option>
							{{{ end }}}
						</select>
					</div>
				</div>
			</form>
		</div>

		<!-- IMPORT admin/partials/settings/toc.tpl -->
	</div>
</div>


