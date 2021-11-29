import { library } from '@fortawesome/fontawesome-svg-core'

import { faAddressCard } from '@fortawesome/pro-solid-svg-icons'
import { faAddressCard as farAddressCard } from '@fortawesome/pro-regular-svg-icons'
import { faAddressCard as falAddressCard } from '@fortawesome/pro-light-svg-icons'

export function configFontAwesome() {
  library.add(faAddressCard, farAddressCard, falAddressCard)
}
