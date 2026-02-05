// Exhibition item from API response
export interface Exhibition {
  title: string
  date: string | null
  address: string | null
  figure: string
  source_url: string
  tags: string[]
  UUID: string
  systematics?: string // For BUG rows
}

// Branch coordinates for venues
export interface BranchCoordinates {
  location_code: string | null
  raw_coordinates: string
  longitude: string
  latitude: string
  google_map_place_id: string | null
  name: string | null
}

// Exhibition information (venue/platform details)
export interface ExhibitionInformation {
  fullname: string
  code_name: string
  external_link?: string
  branch_coordinates: BranchCoordinates | BranchCoordinates[] | null
  location_code: string
  venue_type: string
}

// API response format
export interface ExhibitionResponse {
  information: ExhibitionInformation
  counts: number
  items: Exhibition[]
  last_update: string
  execution_time: number
  visit?: {
    opening?: string
  }
}

// Achievement record
export interface Achievement {
  title: string
  figure: string
  uuid: string
}

// Button style for topic buttons
export interface ButtonStyle {
  color: string
  backgroundColor: string
  borderColor: string
}

// Topic configuration
export interface TopicConfig {
  topic: string       // code name (e.g., 'HuaShan1914')
  name: string        // Chinese display name
  buttonStyle: ButtonStyle
}

// Exhibition status types
export type ExhibitionStatus = '尚未開始' | '進行中' | '已經結束' | '無法判斷'

// Toast notification
export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}
