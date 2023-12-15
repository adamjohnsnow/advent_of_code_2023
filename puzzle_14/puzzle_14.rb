file_lines = File.readlines('input.txt', chomp: true)

tilt_north = file_lines.map(&:chars).transpose.map(&:join)
load = 0
tilt_north.each do |line|
  space = nil
  max_load = line.length
  line.split('').each_with_index do |slot, index|
    space = index if !space && slot == "."
    space = nil if slot == "#"
    if slot == "O" && !space.nil?
      line[space] = "O"
      line[index] = "."
      load += max_load - space
      space += 1
    end

    if slot == "O" && !space
      load += max_load - index
    end

  end
end

p load
p tilt_north.map(&:chars).transpose.map(&:join)
