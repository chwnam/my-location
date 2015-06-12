<?php
/**
 * @var float $lat
 * @var float $lng
 */
?>
<div class="wrap">
	<div id="my-location-map-canvas" style="width: 480px; height: 360px;">
	</div>
	<?php wp_nonce_field( 'my_location_map', 'my_location_map_nonce' ); ?>
	<input type="hidden" name="my-location-lat" value="<?=$lat?>" />
	<input type="hidden" name="my-location-lng" value="<?=$lng?>" />
</div>

<?php /** @var string $address */ ?>
<div>
	<?php wp_nonce_field( 'my_location_address', 'my_location_address_nonce' ); ?>
	<label for="my-location-address"><?=__('Address', 'my-location')?></label>
	<input type="text" id="my-location-address" name="my-location-address" size="50" value="<?=$address?>" />
</div>

<?php /** @var string $rating */ ?>
<div>
	<?php wp_nonce_field( 'my_location_rating', 'my_location_rating_nonce' ); ?>
	<label for="my-location-rating"><?=__('Rating', 'my-location')?></label>
	<select id="my-location-rating" name="my-location-rating">
		<?php for( $r = 10.0; $r >= 0.0; $r -= 0.5 ) : ?>
			<?php $rv = sprintf( "%0.1f", $r); ?>
			<option value="<?=$rv?>" <?=($rating==$rv)?'selected="selected"':''?>><?=$rv?></option>
		<?php endfor; ?>
	</select>
</div>


